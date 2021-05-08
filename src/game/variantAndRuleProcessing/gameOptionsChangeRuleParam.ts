import { GameOptions } from "game";
import { ParamSetting, ParamValue, ParamName, RuleName } from "game/CompactRules";

export const gameOptionsChangeRuleParam = ({
  ruleName,
  paramName,
  gameOptions,
  paramSettings,
  paramNewValue,
}: {
  ruleName: RuleName;
  paramName: ParamName;
  gameOptions: GameOptions;
  paramSettings?: ParamSetting;
  paramNewValue?: ParamValue;
}): GameOptions => {
  if (gameOptions === undefined) return gameOptions;

  // if we have a non default value, we will build the dictionary if it does not exist
  // if we have a default value and the param value exists, we want to delete any excess keys
  // otherwise we just assign the value
  const newValueIsDefault = paramNewValue === (paramSettings || {}).defaultValue;
  if (!newValueIsDefault && gameOptions.ruleNamesWithParams === undefined) {
    gameOptions.ruleNamesWithParams = {
      [ruleName]: { [paramName]: paramNewValue },
    };
  } else if (
    !newValueIsDefault &&
    (gameOptions.ruleNamesWithParams || {})[ruleName] === undefined
  ) {
    (gameOptions.ruleNamesWithParams || {})[ruleName] = { [paramName]: paramNewValue };
  } else if (
    !newValueIsDefault &&
    ((gameOptions.ruleNamesWithParams || {})[ruleName] || {})[paramName] === undefined
  ) {
    return spreadParamIntoGameOptions(ruleName, paramName, gameOptions, paramNewValue);
    //((gameOptions.ruleNamesWithParams || })[ruleName] || {})[paramName] = paramNewValue; // why on earth does this not work.
  } else if (
    newValueIsDefault &&
    ((gameOptions.ruleNamesWithParams || {})[ruleName] || {})[paramName] !== undefined
  ) {
    // if there are is only 1 param remove the entire rule
    const removeRule =
      Object.keys((gameOptions.ruleNamesWithParams || {})[ruleName] || {}).length === 1;
    if (removeRule) {
      delete (gameOptions.ruleNamesWithParams || {})[ruleName];
    } else {
      delete ((gameOptions.ruleNamesWithParams || {})[ruleName] || {})[paramName];
    }
  } else {
    return spreadParamIntoGameOptions(ruleName, paramName, gameOptions, paramNewValue);
  }
  return gameOptions;
};

const spreadParamIntoGameOptions = (
  ruleName: RuleName,
  paramName: ParamName,
  gameOptions: GameOptions,
  paramNewValue?: ParamValue
): GameOptions => {
  return {
    ...gameOptions,
    ruleNamesWithParams: {
      ...gameOptions.ruleNamesWithParams,
      [ruleName]: {
        ...(gameOptions.ruleNamesWithParams || {})[ruleName],
        [paramName]: paramNewValue,
      },
    },
  };
};
