import { uniqBy } from "lodash";

export function deduplicateByName<T extends { name: string }>(rules: T[]): T[] {
  return uniqBy(rules, (rule: T): string => rule.name);
}
