import { Direction } from "game/types";

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
    return new Adjacencies(this.adjacencies);
  }

  resetTo(savePoint: Adjacencies): void {
    this.adjacencies = savePoint.adjacencies;
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
}
