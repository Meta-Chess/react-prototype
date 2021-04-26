import { RuleName, GameOptions } from "game";
import { ParamSetting } from "game/rules/RuleSettingTypes";

export const gameOptionsChangeRuleParam = (
  ruleName: RuleName,
  paramName: string,
  paramSettings: ParamSetting,
  paramNewValue: number,
  gameOptions: GameOptions
): GameOptions => {
  // if we have a non default value, we will build the dictionary if it does not exist
  // if we have a default value and the param value exists, we want to delete any excess keys
  // otherwise we just assign the value
  const newValueIsDefault = paramNewValue === paramSettings.defaultValue;
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
    ((gameOptions.ruleNamesWithParams || {})[ruleName] || {})[paramName] = paramNewValue;
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
    ((gameOptions.ruleNamesWithParams || {})[ruleName] || {})[paramName] = paramNewValue;
  }
  return gameOptions;
};
