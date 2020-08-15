export function range2(
  xStart: number,
  xEnd: number,
  yStart: number,
  yEnd: number
): { x: number; y: number }[][] {
  return xEnd >= xStart && yEnd >= yStart
    ? Array(xEnd - xStart + 1)
        .fill(xStart)
        .map((a, b) => a + b)
        .map((x) =>
          Array(yEnd - yStart + 1)
            .fill(yStart)
            .map((a, b) => a + b)
            .map((y) => ({ x, y }))
        )
    : [];
}
