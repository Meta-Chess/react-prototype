export function filterByValue<K extends string | number | symbol, V>(
  obj: { [key in K]?: V },
  filter: (val: V) => boolean
): { [key in K]?: V } {
  return Object.entries(obj).reduce(
    (acc, [key, val]) => (filter(val as V) ? { ...acc, [key]: val } : acc),
    {}
  );
}
