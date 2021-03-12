import React from "react";
import { Button } from "ui";
import { SFC, Colors } from "primitives";
import { DrawIcon } from "primitives/icons";

interface Props {
  onPress: () => void;
}

export const DrawButton: SFC<Props> = ({ onPress, style }) => {
  return (
    <Button
      label={<DrawIcon color={Colors.DARKER.toString()} />}
      style={style}
      onPress={onPress}
    />
  );
};
