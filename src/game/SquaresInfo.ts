export class SquaresInfo {
  private info: { [location: string]: SquareInfo[] } = {};

  clear(): void {
    this.info = {};
  }

  add(location: string, newInfo: SquareInfo): void {
    this.info[location]
      ? this.info[location].push(newInfo)
      : (this.info[location] = [newInfo]);
  }

  get(location: string): SquareInfo[] {
    return this.info[location] || [];
  }
}

export enum SquareInfo {
  PossibleMovePassiveEndPoint,
  PossibleMoveAggressiveEndPoint,
  PossibleOtherPlayerMoveEndPoint,
  SelectedCurrentPlayerPiece,
  SelectedOtherPlayerPiece,
  LastMoveStartPoint,
  LastMoveEndPoint,
  LastMovePath,
}
