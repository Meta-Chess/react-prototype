export function randomInt(min: number, max: number, includeMax = false): number {
  if (includeMax) max++;
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomChoice<T>(options: T[]): T {
  return options[randomInt(0, options.length)];
}

// Algorithm explanation https://bost.ocks.org/mike/shuffle/
export function shuffleInPlace<T>(array: T[]): T[] {
  let t: T, choice: number;
  for (let m = array.length - 1; m > 0; m--) {
    choice = Math.floor(Math.random() * m);
    t = array[m];
    array[m] = array[choice];
    array[choice] = t;
  }
  return array;
}
