import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "./BaseButton";
import { ButtonProps } from "./ButtonProps";

export const ButtonLight: SFC<ButtonProps> = ({ depressed, ...rest }) => {
  return (
    <BaseButton
      backgroundColor={Colors.MCHESS_BLUE.fade(depressed ? 0.3 : 0)}
      borderColor={Colors.MCHESS_BLUE}
      {...rest}
    />
  );
};
