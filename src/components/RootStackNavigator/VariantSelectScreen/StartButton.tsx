import React from "react";
import { SFC } from "primitives";
import { Button } from "ui";

interface StartButtonProps {
  onPress: () => void;
}

const StartButton: SFC<StartButtonProps> = ({ onPress }) => {
  return (
    <Button
      text="Start Game"
      onPress={onPress}
      style={{
        alignSelf: "center",
        marginTop: 32,
        marginLeft: 64,
        width: 200,
      }}
    />
  );
};

export { StartButton };
