import type { Clock, ClockInfo } from "./Clock";
import type { CompactRules } from "./CompactRules";
import type { Player } from "./Player";
import { cloneDeep } from "lodash";

export enum TurnName {
  Standard = "standard",
}

export interface TurnInfo {
  name: TurnName;
}

export class TurnController {
  constructor(
    public currentTurn: number = 1, // game loop happens for every turn
    public currentHandoverTurn: number = 1, // only increments on player handover
    public currentPlayerIndex: number = 0,
    public inFirstTurnAfterHandover: boolean = true,
    public additionalTurnInfo: TurnInfo[] = [],
    public currentTurnInfo: TurnInfo | undefined
  ) {}

  clone(): TurnController {
    const cloneConstructorInput: Required<ConstructorParameters<typeof TurnController>> =
      [
        this.currentTurn,
        this.currentHandoverTurn,
        this.currentPlayerIndex,
        this.inFirstTurnAfterHandover,
        cloneDeep(this.additionalTurnInfo),
        cloneDeep(this.currentTurnInfo),
      ];

    return new TurnController(...cloneConstructorInput);
  }

  resetTo(savePoint: TurnController): void {
    this.currentTurn = savePoint.currentTurn;
    this.currentHandoverTurn = savePoint.currentHandoverTurn;
    this.currentPlayerIndex = savePoint.currentPlayerIndex;
    this.inFirstTurnAfterHandover = savePoint.inFirstTurnAfterHandover;
    this.additionalTurnInfo = cloneDeep(savePoint.additionalTurnInfo);
    this.currentTurnInfo = cloneDeep(savePoint.currentTurnInfo);
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
