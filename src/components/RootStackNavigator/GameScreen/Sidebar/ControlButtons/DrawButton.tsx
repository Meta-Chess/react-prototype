import React from "react";
import { Button } from "ui";
import { SFC, Colors } from "primitives";
import { VoteDraw } from "primitives/icons";

interface Props {
  onPress: () => void;
}

export const DrawButton: SFC<Props> = ({ onPress, style }) => {
  return (
    <Button text="" style={style} onPress={onPress}>
      <VoteDraw color={Colors.BLACK.toString()} />
    </Button>
  );
};
