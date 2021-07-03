import React, { FC } from "react";
import { Colors, Text } from "primitives";
import { ParamName } from "game/CompactRules";

interface Props {
  paramName: ParamName;
}

export const ParamTitle: FC<Props> = ({ paramName }) => {
  return (
    <Text cat={"BodyM"} color={Colors.TEXT.LIGHT_SECONDARY.toString()}>
      {paramName}
    </Text>
  );
};
