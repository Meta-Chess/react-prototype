import * as rules from "./rules";
export * from "./CompactRules";

type RuleName = keyof typeof rules;

export { rules, RuleName };
