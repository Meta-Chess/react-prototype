import React, { FC } from "react";
import { SFC, Text } from "primitives";
import Color from "color";

interface Props {
  Label: string | FC<{ color?: string }>;
  color: Color;
}

export const ButtonContent: SFC<Props> = ({ Label, color }) => {
  return typeof Label === "string" ? (
    <Text cat="DisplayXS" color={color.toString()} selectable={false}>
      {Label}
    </Text>
  ) : (
    <Label color={color.toString()} />
  );
};
