import { PlayerName } from "game/types";

export class Player {
  constructor(
    public name: PlayerName,
    public alive: boolean = true,
    public endGameMessage: string = "died"
  ) {}

  clone(): Player {
    return new Player(this.name, this.alive, this.endGameMessage);
  }
}
