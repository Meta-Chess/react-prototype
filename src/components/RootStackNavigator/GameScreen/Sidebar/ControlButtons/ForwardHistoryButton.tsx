import React from "react";
import { ButtonSecondary } from "ui/Buttons";
import { SFC } from "primitives";
import { ArrowForwardIcon } from "primitives/icons";

interface Props {
  onPress: () => void;
}

export const ForwardHistoryButton: SFC<Props> = ({ onPress, style }) => {
  return <ButtonSecondary label={<ArrowForwardIcon />} style={style} onPress={onPress} />;
};
