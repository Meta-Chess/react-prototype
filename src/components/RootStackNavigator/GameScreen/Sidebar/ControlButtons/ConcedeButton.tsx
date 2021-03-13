import React from "react";
import { Button } from "ui";
import { SFC } from "primitives";
import { ConcedeIcon } from "primitives/icons";

interface Props {
  onPress: () => void;
}

export const ConcedeButton: SFC<Props> = ({ onPress, style }) => {
  return <Button label={ConcedeIcon} style={style} onPress={onPress} />;
};
