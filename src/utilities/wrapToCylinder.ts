export const wrapToCylinder = (start: number, end: number) => (input: number): number => {
  if (end < start)
    throw new Error("Cannot wrap to a cylinder with backwards coordinates (yet)");
  const circumference = end - start + 1;
  return modulo(input - start, circumference) + start;
};

// returns a mod b
function modulo(a: number, b: number): number {
  return ((a % b) + b) % b;
}
