import * as rules from "./rules";
export { allRuleSettings } from "./ruleSettings";
export * from "./CompactRules";
export * from "./RuleSettingTypes";

type RuleName = keyof typeof rules;

export { rules, RuleName };
