export function keys<K extends string | number | symbol>(
  input?: { [key in K]?: any } // eslint-disable-line
): K[] {
  return Object.keys(input || {}) as K[];
}
