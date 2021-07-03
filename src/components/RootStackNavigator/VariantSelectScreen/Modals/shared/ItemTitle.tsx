import React, { FC } from "react";
import { Colors, Text } from "primitives";
import { ParamName } from "game/CompactRules";

interface Props {
  itemTitle: ParamName | string;
}

export const ItemTitle: FC<Props> = ({ itemTitle }) => {
  return (
    <Text cat={"BodyM"} color={Colors.TEXT.LIGHT_SECONDARY.toString()}>
      {itemTitle}
    </Text>
  );
};
