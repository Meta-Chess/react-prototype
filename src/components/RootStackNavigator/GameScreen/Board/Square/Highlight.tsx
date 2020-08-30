import React, { FC } from "react";
import { Colors } from "primitives";
import { Square } from "game/Board";
import { Game } from "game";
import Color from "color";
import styled from "styled-components/native";
import { View } from "react-native";

interface Props {
  game: Game;
  square: Square;
}

const Highlight: FC<Props> = ({ game, square }) => {
  if (
    !game.allowableMoves.map((m) => m.location).includes(square.location) &&
    !square.hasPieceOf(game.selectedPieces)
  )
    return null;

  const HighlightComponent = square.hasPiece() ? FullHighlight : CenterHighlight;
  const selectedPieceOwner = game.selectedPieces[0]?.owner;
  const highlightColor =
    selectedPieceOwner !== game.currentPlayer
      ? Colors.HIGHLIGHT.INFO
      : square.hasPieceOf(game.selectedPieces)
      ? Colors.HIGHLIGHT.WARNING
      : square.hasPieceNotBelongingTo(selectedPieceOwner)
      ? Colors.HIGHLIGHT.ERROR
      : Colors.HIGHLIGHT.SUCCESS;

  return <HighlightComponent color={highlightColor} />;
};

interface HighlightProps {
  color: Color;
}

const FullHighlight = styled(View)<HighlightProps>`
  background-color: ${({ color }): string => color.fade(0.3).string()};
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const CenterHighlight = styled(View)<HighlightProps>`
  background-color: ${({ color }): string => color.fade(0.3).string()};
  position: absolute;
  top: 30%;
  right: 30%;
  bottom: 30%;
  left: 30%;
  border-radius: 50px;
`;

export { Highlight };
