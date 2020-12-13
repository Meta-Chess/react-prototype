import React from "react";
import { Colors, SFC } from "primitives";
import { BaseButton } from "./BaseButton";

interface Props {
  text: string;
  onPress: () => void;
  accessibilityLabel?: string;
}

export const ButtonTertiary: SFC<Props> = (props) => {
  return (
    <BaseButton
      {...props}
      backgroundColor={Colors.TRANSPARENT}
      borderColor={Colors.TRANSPARENT}
      textColor={Colors.MCHESS_ORANGE}
    />
  );
};
