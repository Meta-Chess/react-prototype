import React, { FC } from "react";
import { SFC } from "primitives";
import { PieceAnimationType, Token } from "game";
import { AnimationComponentProps } from "ui/VariantContent/AnimationComponentProps";
import { ChemicallyExcited } from "ui/VariantContent";

interface PieceAnimationProps {
  token: Token;
  size: number;
}

const PIECE_ANIMATIONS: { [type in PieceAnimationType]: FC<AnimationComponentProps> } = {
  chemicallyExcited: ChemicallyExcited,
};

const PieceAnimation: SFC<PieceAnimationProps> = ({ token, size }) => {
  const animationDuration = token.data?.duration;
  const pieceVisualData = token.data?.pieceVisualData;
  const pieceAnimationType = pieceVisualData?.pieceAnimationType;

  if (!animationDuration || !pieceAnimationType) return null;

  const AnimationComponent = PIECE_ANIMATIONS[pieceAnimationType];
  return (
    <AnimationComponent
      size={size}
      duration={animationDuration}
      pieceVisualData={pieceVisualData}
    />
  );
};

export { PieceAnimation };
