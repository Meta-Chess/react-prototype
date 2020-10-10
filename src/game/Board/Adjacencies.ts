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
    return new Adjacencies(clone(this.dictionary));
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
    // let filteredAdjacencies: string[] = [];
    // Object.values(this.dictionary).forEach((adjacency) => {
    //   if (adjacency !== undefined) {
    //     filteredAdjacencies = filteredAdjacencies.concat(adjacency);
    //   }
    // });
    // return filteredAdjacencies;
  }
}
