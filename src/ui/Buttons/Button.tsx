import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "ui/Buttons/BaseButton";
import { ButtonProps } from "./ButtonProps";

export const Button: SFC<ButtonProps> = ({ depressed, ...rest }) => {
  return (
    <BaseButton
      {...rest}
      backgroundColor={Colors.MCHESS_ORANGE.fade(depressed ? 0.3 : 0)}
      borderWidth={depressed ? 4 : 0}
    />
  );
};
