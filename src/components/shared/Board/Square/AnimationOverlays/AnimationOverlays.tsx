import React from "react";
import { SFC } from "primitives";
import { SquareShape, Token, TokenName, Square } from "game";
import { AbsoluteView } from "ui/Containers";
import { TileAnimation } from "./TileAnimation";

interface AnimationOverlaysProps {
  square: Square;
  shape: SquareShape;
  size: number;
}

const AnimationOverlays: SFC<AnimationOverlaysProps> = ({ square, shape, size }) => {
  return (
    <AbsoluteView pointerEvents={"none"}>
      {square
        .tokensSatisfyingRule(
          (token: Token): boolean => token.name === TokenName.AnimationToken
        )
        .map((token) => (
          <TileAnimation shape={shape} size={size} token={token} key={token.data?.id} />
        ))}
    </AbsoluteView>
  );
};

export { AnimationOverlays };
