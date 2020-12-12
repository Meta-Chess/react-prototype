import { Rule } from "game/Rules";
import { uniqBy } from "lodash";

export function deduplicateByName(rules: Rule[]): Rule[] {
  return uniqBy(rules, (rule: Rule): string => rule.name);
}
