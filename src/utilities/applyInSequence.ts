import { isPresent } from "./isPresent";

export function applyInSequence<T>(
  functions: Array<((x: T) => T) | undefined | null>,
  input: T
): T {
  return functions.filter(isPresent).reduce((outputSoFar, f) => f(outputSoFar), input);
}
