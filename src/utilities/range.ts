export function range(start: number, end: number): number[] {
  return end >= start
    ? Array(end - start + 1)
        .fill(start)
        .map((x, y) => x + y)
    : [];
}
