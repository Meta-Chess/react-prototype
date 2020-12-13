import React from "react";
import { SFC } from "primitives";
import { BaseButton } from "ui/Buttons/BaseButton";

interface Props {
  text: string;
  onPress: () => void;
  accessibilityLabel?: string;
}

export const Button: SFC<Props> = (props) => {
  return <BaseButton {...props} />;
};
