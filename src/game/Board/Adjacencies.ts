import { Direction } from "game/types";
import { clone } from "lodash";
import { Map } from "utilities/Map";
import { isPresent } from "utilities";

export interface Adjacency {
  direction: Direction;
  location: string;
}

export class Adjacencies extends Map<Direction, string[]> {
  clone(): Adjacencies {
    const cloneConstructorInput: Required<ConstructorParameters<typeof Adjacencies>> = [
      clone(this.dictionary),
    ];
    return new Adjacencies(...cloneConstructorInput);
  }

  go(direction: Direction): string[] {
    return this.dictionary[direction] || [];
  }

  addAdjacency({ direction, location }: Adjacency): void {
    if (this.dictionary[direction] && !this.dictionary[direction]?.includes(location))
      this.dictionary[direction]?.push(location);
    else this.dictionary = { ...this.dictionary, [direction]: [location] };
  }

  addAdjacencies(dictionary: Adjacency[]): void {
    dictionary.forEach((adjacency) => this.addAdjacency(adjacency));
  }

  getAllAdjacencies(): string[] {
    return Object.values(this.dictionary).flat().filter(isPresent);
  }

  getClockwiseOrderedLocations(clockwiseOrder: Direction[]): string[] {
    // TODO: doesn't handle multiple adjacencies to same square
    return clockwiseOrder.flatMap((dir) => this.dictionary[dir]).filter(isPresent);
  }

  getAntiClockwiseOrderedLocations(clockwiseOrder: Direction[]): string[] {
    return this.getClockwiseOrderedLocations(clockwiseOrder).reverse();
  }
}
