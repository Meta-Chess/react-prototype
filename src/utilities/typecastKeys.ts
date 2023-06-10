export function typecastKeys<K extends string | number | symbol>(
  input?: { [key in K]?: unknown }
): K[] {
  return Object.keys(input || {}) as K[];
}
