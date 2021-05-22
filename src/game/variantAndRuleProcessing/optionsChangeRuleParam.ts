import { RuleName } from "game";
import { ParamSetting, ParamValue, ParamName, RuleNamesWithParams } from "game/rules";

export const optionsChangeRuleParam = ({
  ruleName,
  paramName,
  tempParamOptions,
  paramSettings,
  paramNewValue,
}: {
  ruleName: RuleName;
  paramName: ParamName;
  tempParamOptions: RuleNamesWithParams;
  paramSettings?: ParamSetting;
  paramNewValue?: ParamValue;
}): RuleNamesWithParams => {
  if (tempParamOptions === undefined) return tempParamOptions;

  // if we have a non default value, we will build the dictionary if it does not exist
  // if we have a default value and the param value exists, we want to delete any excess keys
  // otherwise we just assign the value

  // TODO: stringify is bad because keys can get jumbled...
  const newValueIsDefault = checkValueEqual(paramNewValue, paramSettings?.defaultValue);

  if (!newValueIsDefault && tempParamOptions === undefined) {
    tempParamOptions = {
      [ruleName]: { [paramName]: paramNewValue },
    };
  } else if (!newValueIsDefault && (tempParamOptions || {})[ruleName] === undefined) {
    (tempParamOptions || {})[ruleName] = { [paramName]: paramNewValue };
  } else if (
    !newValueIsDefault &&
    ((tempParamOptions || {})[ruleName] || {})[paramName] === undefined
  ) {
    return spreadParamIntoOptions(ruleName, paramName, tempParamOptions, paramNewValue);
    //((tempParamOptions || {}})[ruleName] || {})[paramName] = paramNewValue; // why on earth does this not work.
  } else if (
    newValueIsDefault &&
    ((tempParamOptions || {})[ruleName] || {})[paramName] !== undefined
  ) {
    // if there are is only 1 param remove the entire rule
    const removeRule = Object.keys((tempParamOptions || {})[ruleName] || {}).length === 1;
    if (removeRule) {
      delete (tempParamOptions || {})[ruleName];
    } else {
      delete ((tempParamOptions || {})[ruleName] || {})[paramName];
    }
  } else {
    return spreadParamIntoOptions(ruleName, paramName, tempParamOptions, paramNewValue);
  }
  return tempParamOptions;
};

const spreadParamIntoOptions = (
  ruleName: RuleName,
  paramName: ParamName,
  tempParamOptions: RuleNamesWithParams,
  paramNewValue?: ParamValue
): RuleNamesWithParams => {
  return {
    ...tempParamOptions,
    [ruleName]: {
      ...(tempParamOptions || {})[ruleName],
      [paramName]: paramNewValue,
    },
  };
};

//TODO: need to do this for each type of ParamValue...
//will not always simplify for list lists
const checkValueEqual = (
  value1: ParamValue | undefined,
  value2: ParamValue | undefined
): boolean => {
  return value1?.toString() === value2?.toString();
};
