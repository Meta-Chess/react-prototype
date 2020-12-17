import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "./BaseButton";

interface Props {
  text: string;
  onPress: () => void;
  accessibilityLabel?: string;
}

export const ButtonSecondary: SFC<Props> = (props) => {
  return (
    <BaseButton
      {...props}
      backgroundColor={Colors.TRANSPARENT}
      textColor={Colors.MCHESS_ORANGE}
    />
  );
};
