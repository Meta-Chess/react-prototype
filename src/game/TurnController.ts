import type { Clock, ClockInfo } from "./Clock";
import type { CompactRules } from "./CompactRules";
import type { Player } from "./Player";
import { cloneDeep } from "lodash";

export enum SubTurnName {
  Standard = "standard",
}

export interface SubTurnInfo {
  name: SubTurnName;
}

export class TurnController {
  constructor(
    public currentSubTurn: number = 1, // game loop happens for every sub-turn
    public currentTurn: number = 1, // only increments on player handover
    public currentPlayerIndex: number = 0,
    public inFirstSubTurnOfCurrentTurn: boolean = true,
    public upcomingSubTurnInfoForCurrentTurn: SubTurnInfo[] = [],
    public currentSubTurnInfo: SubTurnInfo | undefined
  ) {}

  clone(): TurnController {
    const cloneConstructorInput: Required<ConstructorParameters<typeof TurnController>> =
      [
        this.currentSubTurn,
        this.currentTurn,
        this.currentPlayerIndex,
        this.inFirstSubTurnOfCurrentTurn,
        cloneDeep(this.upcomingSubTurnInfoForCurrentTurn),
        cloneDeep(this.currentSubTurnInfo),
      ];

    return new TurnController(...cloneConstructorInput);
  }

  resetTo(savePoint: TurnController): void {
    this.currentSubTurn = savePoint.currentSubTurn;
    this.currentTurn = savePoint.currentTurn;
    this.currentPlayerIndex = savePoint.currentPlayerIndex;
    this.inFirstSubTurnOfCurrentTurn = savePoint.inFirstSubTurnOfCurrentTurn;
    this.upcomingSubTurnInfoForCurrentTurn = cloneDeep(
      savePoint.upcomingSubTurnInfoForCurrentTurn
    );
    this.currentSubTurnInfo = cloneDeep(savePoint.currentSubTurnInfo);
  }

  getCurrentPlayerIndex(): number {
    return this.currentPlayerIndex;
  }

  getCurrentTurn(): number {
    return this.currentTurn;
  }

  getCurrentSubTurn(): number {
    return this.currentSubTurn;
  }

  getCurrentSubTurnInfo(): SubTurnInfo | undefined {
    return this.currentSubTurnInfo;
  }

  getUpcomingSubTurns(): SubTurnInfo[] {
    return this.upcomingSubTurnInfoForCurrentTurn;
  }

  updateSubTurns(subTurnInfo: SubTurnInfo[]): void {
    this.upcomingSubTurnInfoForCurrentTurn = subTurnInfo;
  }

  nextTurn(
    interrupt: CompactRules,
    players: Player[],
    clock?: Clock,
    clockInfo?: ClockInfo
  ): void {
    if (this.inFirstSubTurnOfCurrentTurn) {
      this.inFirstSubTurnOfCurrentTurn = false;
      this.updateSubTurns([]);
      interrupt.for.generateSubTurns({
        turnController: this,
      });
    }

    const upcomingSubTurns = this.getUpcomingSubTurns();
    if (upcomingSubTurns.length === 0) {
      const nextPlayerIndex = (this.currentPlayerIndex + 1) % players.length;
      if (nextPlayerIndex !== undefined) {
        this.currentPlayerIndex = nextPlayerIndex;
        if (clockInfo && clockInfo.doClocks) {
          const asOf = clockInfo.asOf;
          clock?.setActivePlayers([players[nextPlayerIndex].name], asOf);
        }
        this.currentTurn++;
        this.currentSubTurn++;
        this.inFirstSubTurnOfCurrentTurn = true;
        this.currentSubTurnInfo = undefined;
      }
    }

    this.currentSubTurnInfo = upcomingSubTurns[0];
    this.updateSubTurns(upcomingSubTurns.slice(1));
    this.currentSubTurn++;
  }
}
