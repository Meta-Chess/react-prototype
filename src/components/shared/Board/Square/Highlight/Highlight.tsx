import React, { FC } from "react";
import { Colors } from "primitives";
import { Square, SquareShape, GameMaster, SquareInfo } from "game";
import Color from "color";
import styled from "styled-components/native";
import { View } from "react-native";
import { Tile } from "ui";

interface Props {
  gameMaster: GameMaster;
  square: Square;
  size: number;
  shape: SquareShape;
}

const Highlight: FC<Props> = ({ gameMaster, square, size, shape }) => {
  return (
    <>
      {gameMaster.squaresInfo
        .get(square.location) //TODO: sort highlights?
        .map((info, index) =>
          ![
            SquareInfo.PossibleMovePassiveEndPoint,
            SquareInfo.PossibleMoveAggressiveEndPoint,
            SquareInfo.PossibleOtherPlayerMoveEndPoint,
          ].includes(info) || square.hasPiece() ? (
            <Tile
              color={HIGHLIGHT_COLORS[info].fade(0.3).toString()}
              size={size}
              shape={shape}
              key={index}
            />
          ) : (
            <CenterHighlight color={HIGHLIGHT_COLORS[info]} key={index} />
          )
        )}
    </>
  );
};

const HIGHLIGHT_COLORS: { [key in SquareInfo]: Color } = {
  [SquareInfo.PossibleMovePassiveEndPoint]: Colors.HIGHLIGHT.SUCCESS,
  [SquareInfo.PossibleMoveAggressiveEndPoint]: Colors.HIGHLIGHT.ERROR,
  [SquareInfo.PossibleOtherPlayerMoveEndPoint]: Colors.HIGHLIGHT.INFO,
  [SquareInfo.SelectedCurrentPlayerPiece]: Colors.HIGHLIGHT.WARNING,
  [SquareInfo.SelectedOtherPlayerPiece]: Colors.HIGHLIGHT.INFO,
  [SquareInfo.LastMoveStartPoint]: Colors.HIGHLIGHT.WARNING_LIGHT.fade(0.3),
  [SquareInfo.LastMoveEndPoint]: Colors.HIGHLIGHT.WARNING_LIGHT.fade(0.3),
  [SquareInfo.LastMovePath]: Colors.HIGHLIGHT.WARNING_LIGHT.fade(0.5),
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
