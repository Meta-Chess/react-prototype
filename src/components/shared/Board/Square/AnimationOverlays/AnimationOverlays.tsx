import React from "react";
import { SFC } from "primitives";
import { SquareShape } from "game/types";
import { Token, TokenName } from "game/types";
import { AbsoluteView } from "ui/Containers";
import { Square } from "game/Board";
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
