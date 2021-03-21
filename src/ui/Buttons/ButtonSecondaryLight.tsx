import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "./BaseButton";
import { ButtonProps } from "./ButtonProps";

export const ButtonSecondaryLight: SFC<ButtonProps> = ({ depressed, ...rest }) => {
  return (
    <BaseButton
      {...rest}
      backgroundColor={Colors.TRANSPARENT}
      borderColor={(rest.disabled ? Colors.GREY : Colors.MCHESS_BLUE).fade(
        depressed ? 0.3 : 0
      )}
      labelColor={(rest.disabled ? Colors.GREY : Colors.MCHESS_BLUE).fade(
        depressed ? 0.3 : 0
      )}
    />
  );
};
