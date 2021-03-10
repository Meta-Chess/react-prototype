import React from "react";
import { ButtonSecondary } from "ui";
import { SFC } from "primitives";
import { ArrowBack } from "primitives/icons";

interface Props {
  onPress: () => void;
}

export const BackHistoryButton: SFC<Props> = ({ onPress, style }) => {
  return (
    <ButtonSecondary text="" style={style} onPress={onPress}>
      <ArrowBack />
    </ButtonSecondary>
  );
};
