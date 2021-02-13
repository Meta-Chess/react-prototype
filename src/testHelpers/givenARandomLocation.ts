import { randomInt, toLocation } from "utilities";

export function givenARandomLocation(): string {
  return toLocation({ rank: randomInt(0, 8), file: randomInt(0, 8) });
}
