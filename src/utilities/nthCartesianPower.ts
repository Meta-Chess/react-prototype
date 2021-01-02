// Returns a list of all the distinct length n combinations (possibly with repetition) of elements of l
export function nthCartesianPower<T>(l: T[], n: number): T[][] {
  if (n < 1) return [[]];
  return nthCartesianPower(l, n - 1).flatMap((v: T[]) => l.map((x: T) => v.concat(x)));
}
