export function isPresent<T>(val: T | null | undefined): val is T {
  return val !== undefined && val !== null;
}
