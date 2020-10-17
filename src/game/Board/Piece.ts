import { PieceName, Player, Token, Gait, GaitParams } from "game/types";
import { TokenOwner } from "./TokenOwner";

class Piece extends TokenOwner {
  constructor(
    public location: string,
    public name: PieceName,
    public generateGaits: (_?: GaitParams) => Gait[],
    public owner: Player,
    public tokens: Token[] = [],
    public id = "0"
  ) {
    super(tokens);
  }

  clone(): Piece {
    return new Piece(
      this.location,
      this.name,
      this.generateGaits,
      this.owner,
      this.tokens,
      this.id
    );
  }

  resetTo(savePoint: Piece): void {
    this.location = savePoint.location;
    this.name = savePoint.name;
    this.generateGaits = savePoint.generateGaits;
    this.owner = savePoint.owner;
    this.tokens = savePoint.tokens;
    this.id = savePoint.id;
  }
}

export { Piece };
