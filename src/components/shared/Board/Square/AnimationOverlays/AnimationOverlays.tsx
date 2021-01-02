import React from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { SquareShape } from "game/types";
import { Explosion } from "ui/VariantContent";
import { Token, TokenName } from "game/types";
import { Square } from "game/Board";
import { TileAnimation } from "./TileAnimation";

interface AnimationOverlaysProps {
  square: Square;
  shape: SquareShape | undefined;
  size: number;
}

const AnimationOverlays: SFC<AnimationOverlaysProps> = ({ square, shape, size }) => {
  return (
    <View>
      {square
        .tokensSatisfyingRule(
          (token: Token): boolean => token.name === TokenName.AnimationToken
        )
        .map((token) => (
          <TileAnimation shape={shape} size={size} token={token} key={token.data?.id} />
        ))}
    </View>
  );
};

export { AnimationOverlays };
