export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomChoice<T>(options: T[]): T {
  return options[randomInt(0, options.length)];
}
