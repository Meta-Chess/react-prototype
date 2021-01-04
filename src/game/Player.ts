import { PlayerName } from "game/types";

export class Player {
  constructor(
    public name: PlayerName,
    public alive: boolean = true,
    public endGameMessage: string = "",
    public hasLegalMoves: boolean | undefined = undefined
  ) {}

  clone(): Player {
    return new Player(this.name, this.alive, this.endGameMessage, this.hasLegalMoves);
  }
}
