import React from "react";
import { ButtonSecondary } from "ui/Buttons";
import { SFC } from "primitives";
import { ArrowForward } from "primitives/icons";

interface Props {
  onPress: () => void;
}

export const ForwardHistoryButton: SFC<Props> = ({ onPress, style }) => {
  return (
    <ButtonSecondary text="" style={style} onPress={onPress}>
      <ArrowForward />
    </ButtonSecondary>
  );
};
