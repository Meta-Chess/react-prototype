import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "./BaseButton";
import { ButtonProps } from "./ButtonProps";

export const ButtonTertiaryLight: SFC<ButtonProps> = ({ depressed, ...rest }) => {
  return (
    <BaseButton
      {...rest}
      backgroundColor={Colors.TRANSPARENT}
      borderColor={Colors.TRANSPARENT}
      labelColor={(rest.disabled ? Colors.GREY : Colors.MCHESS_BLUE).fade(depressed ? 0.3 : 0)}
    />
  );
};
