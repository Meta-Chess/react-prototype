// flatMapValues will apply a given function to each element of an array.
// The function should return an object with array as values and the same keys for any input.
// flatMapValues will then concatenate the lists on corresponding keys of the returned objects

// Not currently in use (?)

/* eslint-disable @typescript-eslint/no-explicit-any */
export function flatMapValues<T, O extends { [key in string]: any[] }>(
  xs: T[],
  f: (x: T) => O
): O {
  const objects = xs.map(f);
  return objects.reduce((acc, object) => concatenateValues(acc, object));
}

export function concatenateValues<O extends { [key in string]: any[] }>(
  a: O,
  b: O
): O {
  return Object.keys(a).reduce(
    (acc, key) => ({
      ...acc,
      [key]: [...a[key], ...b[key]],
    }),
    {}
  ) as O;
}
