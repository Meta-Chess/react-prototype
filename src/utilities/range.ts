export function range(start: number, count: number, step = 1): number[] {
  return count > 0
    ? Array(count)
        .fill(start)
        .map((x, y) => x + step * y)
    : [];
}
