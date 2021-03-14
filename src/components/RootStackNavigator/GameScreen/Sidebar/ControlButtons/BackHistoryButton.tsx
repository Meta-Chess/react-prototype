import React from "react";
import { ButtonSecondary } from "ui";
import { SFC } from "primitives";
import { ArrowBackIcon } from "primitives/icons";

interface Props {
  onPress: () => void;
}

export const BackHistoryButton: SFC<Props> = ({ onPress, style }) => {
  return <ButtonSecondary label={<ArrowBackIcon />} style={style} onPress={onPress} />;
};
