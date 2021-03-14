import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "./BaseButton";
import { ButtonProps } from "./ButtonProps";

export const ButtonLight: SFC<ButtonProps> = (props) => {
  return (
    <BaseButton
      backgroundColor={Colors.MCHESS_BLUE}
      borderColor={Colors.MCHESS_BLUE}
      {...props}
    />
  );
};
