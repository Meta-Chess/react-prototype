export function resetArrayTo<T>(input: { from: Array<T>; to: Array<T> }): void {
  input.from.length = input.to.length;
  for (let i = 0; i < input.from.length; i++) {
    input.from[i] = input.to[i];
  }
}
