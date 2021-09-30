export function resetArrayTo<T>(input: { from: Array<T>; to: Array<T> }): void {
  input.from.length = input.to.length;
  for (let i = 0; i < input.from.length; i++) {
    input.from[i] = input.to[i];
  }
}

export function rotateArray<T>(a: T[], by: number): T[] {
  const array = [...a];
  if (by > 0) {
    for (let i = 0; i < Math.abs(by); i++) {
      array.unshift(array.pop() as T);
    }
  } else if (by < 0) {
    for (let i = 0; i < Math.abs(by); i++) {
      array.push(array.shift() as T);
    }
  }
  return array;
}
