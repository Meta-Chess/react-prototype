import { Direction, Location } from "domain/Game/types";

export interface Adjacency {
  direction: Direction;
  location: Location;
}

export class Adjacencies {
  constructor(
    private adjacencies: {
      [key in Direction]?: Location[];
    } = {}
  ) {}

  go(direction: Direction): Location[] | undefined {
    return this.adjacencies[direction];
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
