import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "./BaseButton";
import { ButtonProps } from "./ButtonProps";

export const ButtonSecondaryLight: SFC<ButtonProps> = (props) => {
  return (
    <BaseButton
      {...props}
      backgroundColor={Colors.TRANSPARENT}
      borderColor={Colors.MCHESS_BLUE}
      textColor={Colors.MCHESS_BLUE}
    />
  );
};
