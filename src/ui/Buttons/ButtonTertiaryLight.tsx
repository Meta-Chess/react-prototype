import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "./BaseButton";
import { ButtonProps } from "./ButtonProps";

export const ButtonTertiaryLight: SFC<ButtonProps> = (props) => {
  return (
    <BaseButton
      {...props}
      backgroundColor={Colors.TRANSPARENT}
      borderColor={Colors.TRANSPARENT}
      textColor={Colors.MCHESS_BLUE}
    />
  );
};
