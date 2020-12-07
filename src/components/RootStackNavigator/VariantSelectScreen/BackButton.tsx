import React from "react";
import { SFC } from "primitives";
import { Button } from "ui";

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: SFC<BackButtonProps> = ({ style, onPress }) => {
  return <Button text="Back" onPress={onPress} style={style} />;
};

export { BackButton };
