import React from "react";
import { SFC } from "primitives";
import { SquareShape, Token, TokenName, Square } from "game";
import { AbsoluteView } from "ui/Containers";
import { TileAnimation } from "./TileAnimation";
import { TileSchematic } from "ui/Tiles/TileProps";

interface AnimationOverlaysProps {
  square: Square;
  shape: SquareShape;
  tileSchematic?: TileSchematic;
  size?: number;
}

const AnimationOverlays: SFC<AnimationOverlaysProps> = ({
  square,
  shape,
  tileSchematic,
  size,
}) => {
  return (
    <AbsoluteView pointerEvents={"none"}>
      {square
        .tokensSatisfyingRule(
          (token: Token): boolean =>
            token.name === TokenName.AnimationToken &&
            token.data?.pieceVisualData === undefined
        )
        .map((token) => (
          <TileAnimation
            shape={shape}
            tileSchematic={tileSchematic}
            size={size}
            token={token}
            key={token.data?.id}
          />
        ))}
    </AbsoluteView>
  );
};

export { AnimationOverlays };
