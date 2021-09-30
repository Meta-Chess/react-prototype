import React, { FC } from "react";
import { SFC } from "primitives";
import { AnimationType, SquareShape, Token } from "game";
import { Explosion } from "ui/VariantContent";
import { AnimationComponentProps } from "ui/VariantContent/AnimationComponentProps";
import { TileSchematic } from "ui/Tiles/TileProps";

interface TileAnimationProps {
  shape: SquareShape;
  tileSchematic?: TileSchematic;
  size?: number;
  token: Token;
}

const ANIMATIONS: { [type in AnimationType]: FC<AnimationComponentProps> } = {
  explosion: Explosion,
};

const TileAnimation: SFC<TileAnimationProps> = ({
  shape,
  size,
  tileSchematic,
  token,
}) => {
  const animationType = token.data?.type;
  const animationDuration = token.data?.duration;
  const animationDelay = token.data?.delay;

  if (!animationDuration || !animationType) return null;

  const AnimationComponent = ANIMATIONS[animationType];
  return (
    <AnimationComponent
      shape={shape}
      size={size}
      tileSchematic={tileSchematic}
      duration={animationDuration}
      delay={animationDelay}
    />
  );
};

export { TileAnimation };
