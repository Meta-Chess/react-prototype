import { PlayerName } from "game/types";
import { cloneDeep } from "lodash";

export class Player {
  constructor(
    public name: PlayerName,
    public alive: boolean = true,
    public endGameMessage: string = "",
    public hasLegalMoves: { value: boolean; turn: number } = {
      value: false,
      turn: -1,
    }
  ) {}

  clone(): Player {
    return new Player(
      this.name,
      this.alive,
      this.endGameMessage,
      cloneDeep(this.hasLegalMoves)
    );
  }

  resetTo(savePoint: Player): void {
    this.name = savePoint.name;
    this.alive = savePoint.alive;
    this.endGameMessage = savePoint.endGameMessage;
    this.hasLegalMoves = {
      value: savePoint.hasLegalMoves.value,
      turn: savePoint.hasLegalMoves.turn,
    };
  }
}
