import { PieceName, Player, Token, Gait, GaitParams } from "game/types";
import { TokenOwner } from "./TokenOwner";

class Piece extends TokenOwner {
  id: number;
  constructor(
    public location: string,
    public name: PieceName,
    public generateGaits: (_?: GaitParams) => Gait[],
    public owner: Player,
    public tokens: Token[] = []
  ) {
    super(tokens);
    this.id = Math.random();
  }
}

export { Piece };
