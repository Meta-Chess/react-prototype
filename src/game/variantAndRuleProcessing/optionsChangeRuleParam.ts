import { RuleName } from "game";
import {
  ParamSetting,
  ParamValue,
  ParamName,
  RuleNamesWithParams,
} from "game/CompactRules";
import { cloneDeep } from "lodash";
import { keys } from "utilities";

export const optionsChangeRuleParam = ({
  ruleName,
  paramName,
  tempParamOptions,
  paramSettings,
  paramNewValue,
}: {
  ruleName: RuleName;
  paramName: ParamName;
  tempParamOptions?: RuleNamesWithParams;
  paramSettings?: ParamSetting;
  paramNewValue?: ParamValue;
}): RuleNamesWithParams => {
  const newValueIsDefault = checkValueEqual(paramNewValue, paramSettings?.defaultValue);
  const newOptions = omitParamValue({ ruleName, paramName, tempParamOptions });

  return newValueIsDefault
    ? newOptions
    : injectParamValue({
        ruleName,
        paramName,
        tempParamOptions: newOptions,
        paramNewValue,
      });
};

const omitParamValue = ({
  ruleName,
  paramName,
  tempParamOptions = {},
}: {
  ruleName: RuleName;
  paramName: ParamName;
  tempParamOptions?: RuleNamesWithParams;
}): RuleNamesWithParams => {
  const newOptions = cloneDeep(tempParamOptions);
  delete newOptions[ruleName]?.[paramName];
  if (!newOptions[ruleName] || keys(newOptions[ruleName]).length === 0) {
    delete newOptions[ruleName];
  }
  return newOptions;
};

const injectParamValue = ({
  ruleName,
  paramName,
  tempParamOptions,
  paramNewValue,
}: {
  ruleName: RuleName;
  paramName: ParamName;
  tempParamOptions: RuleNamesWithParams;
  paramNewValue?: ParamValue;
}): RuleNamesWithParams => {
  return {
    ...tempParamOptions,
    [ruleName]: {
      ...tempParamOptions[ruleName],
      [paramName]: paramNewValue,
    },
  };
};

// TODO: need to do this for each type of ParamValue...
//will not always simplify for list lists
const checkValueEqual = (
  value1: ParamValue | undefined,
  value2: ParamValue | undefined
): boolean => {
  return value1?.toString() === value2?.toString();
};
