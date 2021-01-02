import React from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { SquareShape } from "game/types";
import { Explosion } from "ui/VariantContent";
import { Token } from "game/types";

interface TileAnimationOverlayProps {
  shape: SquareShape | undefined;
  size: number;
  token: Token;
}

const TileAnimationOverlay: SFC<TileAnimationOverlayProps> = ({ shape, size, token }) => {
  const animationType = token.data?.type;
  const animationDuration = token.data?.duration;

  const options = {
    ["explosion"]: <Explosion shape={shape} size={size} duration={animationDuration} />,
  };
  return animationType ? options[animationType] : <View />;
};

export { TileAnimationOverlay };
