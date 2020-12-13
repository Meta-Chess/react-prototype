import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "./BaseButton";

interface Props {
  text: string;
  onPress: () => void;
  accessibilityLabel?: string;
}

export const ButtonSecondaryLight: SFC<Props> = (props) => {
  return (
    <BaseButton
      {...props}
      backgroundColor={Colors.TRANSPARENT}
      borderColor={Colors.MCHESS_BLUE}
      textColor={Colors.MCHESS_BLUE}
    />
  );
};
