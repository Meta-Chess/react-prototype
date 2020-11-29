import { Rule } from "game/Rules";
export function deduplicateByName(rules: Rule[]): Rule[] {
  const noDups: Rule[] = [];
  const uniqueNames: { [id: string]: undefined } = {};
  for (const rule of rules) {
    if (rule.name in uniqueNames) continue;
    uniqueNames[rule.name] = undefined;
    noDups.push(rule);
  }
  return noDups;
}
