import { clone } from "lodash";
import { isPresent } from "utilities";
import { Square } from "../Square";

export class LocationMap {
  constructor(
    private squares: { [location in string]?: Square } = {},
    private locationsTouched: Set<string> = new Set<string>()
  ) {}

  addSquare({ location, square }: { location: string; square: Square }): void {
    this.locationsTouched.add(location);
    this.addSquareNoTouch({ location, square });
  }

  removeSquare(location: string): void {
    this.locationsTouched.add(location);
    this.removeSquareNoTouch(location);
  }

  getSquare(location: string): Square | undefined {
    this.locationsTouched.add(location);
    return this.getSquareNoTouch(location);
  }

  getAllSquares(): Square[] {
    const squares = Object.values(this.squares).filter(isPresent);
    squares.forEach((s) => s && this.locationsTouched.add(s.location));
    return squares;
  }

  getLocations(): string[] {
    return Object.keys(this.squares);
  }

  clone(): LocationMap {
    const newSquares: { [k in string]?: Square } = {};
    this.getLocations().forEach(
      (loc) => (newSquares[loc] = this.cloneValue(this.getSquareNoTouch(loc)))
    );

    return new LocationMap(newSquares, clone(this.locationsTouched));
  }

  cloneValue(square: Square | undefined): Square | undefined {
    return square?.clone();
  }

  resetTo(savePoint: LocationMap): void {
    this.locationsTouched.forEach((location) => this.resetLocation(location, savePoint));
    this.locationsTouched = clone(savePoint.locationsTouched);
  }

  resetLocation(location: string, savePoint: LocationMap): void {
    const squareHere = this.getSquareNoTouch(location);
    const squareThere = savePoint.getSquareNoTouch(location);
    if (!squareThere) {
      this.removeSquareNoTouch(location);
    } else if (squareHere) {
      squareHere.resetTo(squareThere);
    } else {
      this.addSquareNoTouch({ location, square: squareThere.clone() });
    }
  }

  private getSquareNoTouch(location: string): Square | undefined {
    return this.squares[location];
  }

  private addSquareNoTouch({
    location,
    square,
  }: {
    location: string;
    square: Square;
  }): void {
    this.squares = { ...this.squares, [location]: square };
  }

  private removeSquareNoTouch(location: string): void {
    delete this.squares[location];
  }
}
