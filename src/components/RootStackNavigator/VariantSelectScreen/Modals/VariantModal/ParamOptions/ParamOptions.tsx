import React from "react";
import { SFC } from "primitives";
import { ParamSettingType } from "game/CompactRules";
import { ParamIntegerOptions } from "./ParamIntegerOptions";
import { ParamBooleanOptions } from "./ParamBooleanOptions";
import { ParamPieceCyclesOptions } from "./ParamPieceCyclesOptions";
import { ParamProps } from "./shared/ParamProps";
import { ItemContainer } from "components/RootStackNavigator/VariantSelectScreen/Modals/shared";

const PARAM_OPTIONS: { [type in ParamSettingType]: SFC<ParamProps> | undefined } = {
  [ParamSettingType.Integer]: ParamIntegerOptions,
  [ParamSettingType.Boolean]: ParamBooleanOptions,
  [ParamSettingType.PieceCycles]: ParamPieceCyclesOptions,
};

export const ParamOptions: SFC<ParamProps> = ({
  ruleName,
  paramName,
  paramSettings,
  paramDefault,
  tempParamOptions,
  setTempParamOptions,
  style,
}) => {
  if (paramSettings === undefined) return <></>;
  const ParamOption = PARAM_OPTIONS[paramSettings.paramType];
  if (ParamOption === undefined) return <></>;

  return (
    <ItemContainer>
      <ParamOption
        ruleName={ruleName}
        paramName={paramName}
        paramSettings={paramSettings}
        paramDefault={paramDefault}
        tempParamOptions={tempParamOptions}
        setTempParamOptions={setTempParamOptions}
        style={[
          style,
          {
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      />
    </ItemContainer>
  );
};
