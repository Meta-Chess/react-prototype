import React from "react";
import { SFC } from "primitives";
import { Button } from "ui";

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: SFC<BackButtonProps> = ({ onPress }) => {
  return (
    <Button
      text="Back"
      onPress={onPress}
      style={{
        alignSelf: "center",
        marginTop: 32,
        marginRight: 64,
        width: 200,
      }}
    />
  );
};

export { BackButton };
