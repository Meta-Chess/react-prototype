import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "./BaseButton";
import { ButtonProps } from "./ButtonProps";

export const ButtonTertiary: SFC<ButtonProps> = (props) => {
  return (
    <BaseButton
      {...props}
      backgroundColor={Colors.TRANSPARENT}
      borderColor={Colors.TRANSPARENT}
      labelColor={props.disabled ? Colors.GREY : Colors.MCHESS_ORANGE}
    />
  );
};
