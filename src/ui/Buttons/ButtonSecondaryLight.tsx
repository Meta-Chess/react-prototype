import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "./BaseButton";
import { ButtonProps } from "./ButtonProps";

export const ButtonSecondaryLight: SFC<ButtonProps> = (props) => {
  return (
    <BaseButton
      {...props}
      backgroundColor={Colors.TRANSPARENT}
      borderColor={props.disabled ? Colors.GREY : Colors.MCHESS_BLUE}
      labelColor={props.disabled ? Colors.GREY : Colors.MCHESS_BLUE}
    />
  );
};
