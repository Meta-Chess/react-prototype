import React from "react";
import { SFC } from "primitives";
import { ParamSettingType } from "game/rules/RuleSettingTypes";
import { ParamIntegerOptions } from "./ParamIntegerOptions";
import { ParamProps } from "./ParamProps";

const PARAM_OPTIONS: { [type in ParamSettingType]: SFC<ParamProps> } = {
  [ParamSettingType.Integer]: ParamIntegerOptions,
};

export const ParamOptions: SFC<ParamProps> = ({
  ruleName,
  paramName,
  paramSettings,
  gameOptions,
  setGameOptions,
  style,
}) => {
  const ParamOption = PARAM_OPTIONS[paramSettings.paramType];

  return (
    <ParamOption
      ruleName={ruleName}
      paramName={paramName}
      paramSettings={paramSettings}
      gameOptions={gameOptions}
      setGameOptions={setGameOptions}
      style={style}
    />
  );
};
