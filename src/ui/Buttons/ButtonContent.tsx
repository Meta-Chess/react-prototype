import React, { FC } from "react";
import { SFC, Text } from "primitives";
import Color from "color";

export type ButtonSize = "Standard" | "Small";
interface Props {
  Label: string | FC<{ color?: string }>;
  color: Color;
  size?: ButtonSize;
}

export const ButtonContent: SFC<Props> = ({ Label, color, size = "Standard" }) => {
  return typeof Label === "string" ? (
    <Text
      cat={size === "Standard" ? "DisplayXS" : "BodyS"}
      color={color.toString()}
      selectable={false}
    >
      {Label}
    </Text>
  ) : (
    <Label color={color.toString()} />
  );
};
