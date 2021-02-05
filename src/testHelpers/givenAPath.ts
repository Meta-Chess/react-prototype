import { randomInt, range } from "utilities";
import { givenARandomLocation } from "./givenARandomLocation";
import { Path } from "game";

export function givenAPath(
  details: { start?: string; end?: string; length?: number } = {}
): Path {
  const length = details.length !== undefined ? details.length : randomInt(2, 64);
  if (length < 1) throw new Error("Paths must have at least one location");
  if (details.start && details.end && length < 2)
    throw new Error("Paths with a start and end must have at least length 2");
  const end = details.end || givenARandomLocation();
  const start = details.start || length === 1 ? end : givenARandomLocation();
  const middle = range(0, length - 2).map(() => givenARandomLocation());
  return new Path(start, [...middle, end]);
}
