// WARNING: Do not copy these patterns unless you're very sure of what's happening
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */

export function getKeys(E: any): string[] {
  return Object.keys(E).filter((k) => typeof E[k as any] === "number");
}

export function getValues<T>(E: any): T[] {
  return getKeys(E).map((k) => E[k as any]);
}
