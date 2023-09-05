// TODO: make this not lie about its return type
/**
 * @deprecated this function lies about its return type, e.g. saying it returns a number[] when it will always be returning a string[] from Object.keys
 * @returns an array of strings that represent the keys of the object
 */
export function keys<K extends string | number | symbol>(
  input?: { [key in K]?: unknown }
): K[] {
  return Object.keys(input || {}) as K[];
}
