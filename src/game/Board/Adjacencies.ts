import { Direction } from "game/types";
import { clone } from "lodash";

export interface Adjacency {
  direction: Direction;
  location: string;
}

export class Adjacencies {
  constructor(
    private adjacencies: {
      [key in Direction]?: string[];
    } = {}
  ) {}

  clone(): Adjacencies {
    return new Adjacencies(clone(this.adjacencies));
  }

  resetTo(savePoint: Adjacencies): void {
    this.adjacencies = clone(savePoint.adjacencies);
  }

  go(direction: Direction): string[] {
    return this.adjacencies[direction] || [];
  }

  addAdjacency({ direction, location }: Adjacency): void {
    if (this.adjacencies[direction] && !this.adjacencies[direction]?.includes(location))
      this.adjacencies[direction]?.push(location);
    else this.adjacencies = { ...this.adjacencies, [direction]: [location] };
  }

  addAdjacencies(adjacencies: Adjacency[]): void {
    adjacencies.forEach((adjacency) => this.addAdjacency(adjacency));
  }

  getAllAdjacencies(): string[] {
    const filteredAdjacencies: string[] = [];
    Object.values(this.adjacencies).forEach((adjacency) => {
      if (adjacency !== undefined) filteredAdjacencies.concat(adjacency);
    });
    return filteredAdjacencies;
  }
}
