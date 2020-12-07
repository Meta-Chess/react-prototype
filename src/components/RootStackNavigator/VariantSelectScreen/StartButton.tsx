import React from "react";
import { SFC } from "primitives";
import { Button } from "ui";

interface StartButtonProps {
  onPress: () => void;
}

const StartButton: SFC<StartButtonProps> = ({ style, onPress }) => {
  return <Button text="Start Game" onPress={onPress} style={style} />;
};

export { StartButton };
