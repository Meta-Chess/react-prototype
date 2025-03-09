import type { Clock, ClockInfo } from "./Clock";
import type { CompactRules } from "./CompactRules";
import type { Player } from "./Player";
import { cloneDeep } from "lodash";

export enum TurnName {
  Standard = "standard",
  NimbusPromotion = "nimbusPromotion",
}

export interface TurnInfo {
  name: TurnName;
}

export interface TurnIndexes {
  currentTurn: number;
  currentHandoverTurn: number;
}

interface TurnControllerParams {
  currentTurn?: number;
  currentHandoverTurn?: number;
  currentPlayerIndex?: number;
  inFirstTurnAfterHandover?: boolean;
  additionalTurnInfo?: TurnInfo[];
  currentTurnInfo?: TurnInfo;
}

export class TurnController {
  public currentTurn: number;
  public currentHandoverTurn: number;
  public currentPlayerIndex: number;
  public inFirstTurnAfterHandover: boolean;
  public additionalTurnInfo: TurnInfo[];
  public currentTurnInfo?: TurnInfo;

  constructor({
    currentTurn = 1,
    currentHandoverTurn = 1,
    currentPlayerIndex = 0,
    inFirstTurnAfterHandover = true,
    additionalTurnInfo = [],
    currentTurnInfo,
  }: TurnControllerParams = {}) {
    this.currentTurn = currentTurn;
    this.currentHandoverTurn = currentHandoverTurn;
    this.currentPlayerIndex = currentPlayerIndex;
    this.inFirstTurnAfterHandover = inFirstTurnAfterHandover;
    this.additionalTurnInfo = additionalTurnInfo;
    this.currentTurnInfo = currentTurnInfo;
  }

  clone(): TurnController {
    const cloneConstructorInput: TurnControllerParams = {
      currentTurn: this.currentTurn,
      currentHandoverTurn: this.currentHandoverTurn,
      currentPlayerIndex: this.currentPlayerIndex,
      inFirstTurnAfterHandover: this.inFirstTurnAfterHandover,
      additionalTurnInfo: cloneDeep(this.additionalTurnInfo),
      currentTurnInfo: cloneDeep(this.currentTurnInfo),
    };

    return new TurnController(cloneConstructorInput);
  }

  resetTo(savePoint: TurnController): void {
    this.currentTurn = savePoint.currentTurn;
    this.currentHandoverTurn = savePoint.currentHandoverTurn;
    this.currentPlayerIndex = savePoint.currentPlayerIndex;
    this.inFirstTurnAfterHandover = savePoint.inFirstTurnAfterHandover;
    this.additionalTurnInfo = cloneDeep(savePoint.additionalTurnInfo);
    this.currentTurnInfo = cloneDeep(savePoint.currentTurnInfo);
  }

  getTurnIndexes(): TurnIndexes {
    return {
      currentTurn: this.getCurrentTurn(),
      currentHandoverTurn: this.getCurrentHandoverTurn(),
    };
  }

  getCurrentTurn(): number {
    return this.currentTurn;
  }

  getCurrentTurnInfo(): TurnInfo | undefined {
    return this.currentTurnInfo;
  }

  getCurrentPlayerIndex(): number {
    return this.currentPlayerIndex;
  }

  getCurrentHandoverTurn(): number {
    return this.currentHandoverTurn;
  }

  getAdditionalTurns(): TurnInfo[] {
    return this.additionalTurnInfo;
  }

  updateAdditionalTurns(additionalTurnInfo: TurnInfo[]): void {
    this.additionalTurnInfo = additionalTurnInfo;
  }

  nextTurn(
    interrupt: CompactRules,
    players: Player[],
    clock?: Clock,
    clockInfo?: ClockInfo
  ): void {
    if (this.inFirstTurnAfterHandover) {
      this.inFirstTurnAfterHandover = false;
      this.updateAdditionalTurns([]);
      interrupt.for.generateAdditionalTurns({
        turnController: this,
      });
    }

    const additionalTurns = this.getAdditionalTurns();
    if (additionalTurns.length === 0) {
      const nextPlayerIndex = (this.currentPlayerIndex + 1) % players.length;
      if (nextPlayerIndex !== undefined) {
        this.currentPlayerIndex = nextPlayerIndex;
        if (clockInfo && clockInfo.doClocks) {
          const asOf = clockInfo.asOf;
          clock?.setActivePlayers([players[nextPlayerIndex].name], asOf);
        }
        this.currentHandoverTurn++;
        this.currentTurn++;
        this.inFirstTurnAfterHandover = true;
        this.currentTurnInfo = undefined;
      }
    }

    this.currentTurnInfo = additionalTurns[0];
    this.updateAdditionalTurns(additionalTurns.slice(1));
    this.currentTurn++;
  }
}
