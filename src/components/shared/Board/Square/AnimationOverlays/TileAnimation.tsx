import React, { FC } from "react";
import { SFC } from "primitives";
import { AnimationType, SquareShape, Token } from "game";
import { Explosion } from "ui/VariantContent";
import { AnimationComponentProps } from "ui/VariantContent/AnimationComponentProps";

interface TileAnimationProps {
  shape: SquareShape;
  size: number;
  token: Token;
}

const ANIMATIONS: { [type in AnimationType]: FC<AnimationComponentProps> } = {
  explosion: Explosion,
};

const TileAnimation: SFC<TileAnimationProps> = ({ shape, size, token }) => {
  const animationType = token.data?.type;
  const animationDuration = token.data?.duration;

  if (!animationDuration || !animationType) return null;

  const AnimationComponent = ANIMATIONS[animationType];
  return <AnimationComponent shape={shape} size={size} duration={animationDuration} />;
};

export { TileAnimation };
