import { PieceName, PlayerName, Token, Gait, GaitParams, AccessMarker } from "game/types";
import { TokenOwner } from "./TokenOwner";

class Piece extends TokenOwner {
  constructor(
    public name: PieceName,
    public owner: PlayerName,
    public generateGaits: (_?: GaitParams) => Gait[] = (): Gait[] => [],
    public location: string = "unassigned",
    public tokens: Token[] = [],
    public id = "0",
    public AccessMarkers: AccessMarker[] = [AccessMarker.Normal]
  ) {
    super(tokens);
  }

  clone(): Piece {
    const cloneConstructorInput: Required<ConstructorParameters<typeof Piece>> = [
      this.name,
      this.owner,
      this.generateGaits,
      this.location,
      this.cloneTokens(this.tokens),
      this.id,
      [...this.AccessMarkers],
    ];
    return new Piece(...cloneConstructorInput);
  }

  resetTo(savePoint: Piece): void {
    this.location = savePoint.location;
    this.name = savePoint.name;
    this.generateGaits = savePoint.generateGaits;
    this.owner = savePoint.owner;
    this.tokens = [...savePoint.tokens];
    this.id = savePoint.id;
    this.AccessMarkers = [...savePoint.AccessMarkers];
  }
}

export { Piece };
