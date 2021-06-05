// TODO: replace this with ts-is-present
export function isPresent<T>(val: T | null | undefined): val is T {
  return val !== undefined && val !== null;
}
