import React from "react";
import { SFC } from "primitives";
import { ParamSettingType, ParamName } from "game/rules";
import { ParamIntegerOptions } from "./ParamIntegerOptions";
import { ParamBooleanOptions } from "./ParamBooleanOptions";
import { ParamProps } from "./ParamProps";

const PARAM_OPTIONS: { [type in ParamSettingType]: SFC<ParamProps> | undefined } = {
  [ParamSettingType.Integer]: ParamIntegerOptions,
  [ParamSettingType.Boolean]: ParamBooleanOptions,
};

export const ParamOptions: SFC<ParamProps> = ({
  ruleName,
  paramName,
  paramSettings,
  gameOptions,
  setGameOptions,
  style,
}) => {
  if (paramSettings === undefined) return <></>;
  const ParamOption = PARAM_OPTIONS[paramSettings.paramType];
  if (ParamOption === undefined) return <></>;

  // unpack default
  const paramDefaultValue =
    ((gameOptions.ruleNamesWithParams || {})[ruleName] || {})[paramName as ParamName] ||
    paramSettings.defaultValue;

  return (
    <ParamOption
      ruleName={ruleName}
      paramName={paramName}
      paramSettings={paramSettings}
      paramDefault={paramDefaultValue}
      gameOptions={gameOptions}
      setGameOptions={setGameOptions}
      style={style}
    />
  );
};
