import React, { FC } from "react";
import { Colors } from "primitives";
import { Square } from "game/Board";
import { GameMaster } from "game";
import Color from "color";
import styled from "styled-components/native";
import { View } from "react-native";
import { SquareShape } from "game/types";
import { FullHighlight } from "./FullHighlight";

interface Props {
  gameMaster: GameMaster;
  square: Square;
  size: number;
  shape?: SquareShape;
}

const Highlight: FC<Props> = ({ gameMaster, square, size, shape }) => {
  if (
    !gameMaster.allowableMoves.map((m) => m.location).includes(square.location) &&
    !square.hasPieceOf(gameMaster.selectedPieces)
  )
    return null;

  const selectedPieceOwner = gameMaster.selectedPieces[0]?.owner;
  const highlightColor =
    selectedPieceOwner !== gameMaster.game.currentPlayer
      ? Colors.HIGHLIGHT.INFO
      : square.hasPieceOf(gameMaster.selectedPieces)
      ? Colors.HIGHLIGHT.WARNING
      : gameMaster.game.board.squareHasPieceNotBelongingTo(square, selectedPieceOwner)
      ? Colors.HIGHLIGHT.ERROR
      : Colors.HIGHLIGHT.SUCCESS;

  return square.hasPiece() ? (
    <FullHighlight color={highlightColor} size={size} shape={shape} />
  ) : (
    <CenterHighlight color={highlightColor} />
  );
};

interface HighlightProps {
  color: Color;
}

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
