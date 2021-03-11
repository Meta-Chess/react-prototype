import React from "react";
import { Button } from "ui";
import { SFC, Colors } from "primitives";
import { VoteConcede } from "primitives/icons";

interface Props {
  onPress: () => void;
}

export const ConcedeButton: SFC<Props> = ({ onPress, style }) => {
  return (
    <Button text="" style={style} onPress={onPress}>
      <VoteConcede color={Colors.DARKER.toString()} />
    </Button>
  );
};
