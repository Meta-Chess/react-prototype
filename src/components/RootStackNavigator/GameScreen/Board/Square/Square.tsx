import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import Color from "color";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { Piece } from "./Piece";
import { GridArrangement } from "./GridArrangement";
import { GameContext } from "game";
import { Square } from "game/Board";
import { TokenName, SquareShape } from "game/types";

interface Props {
  squares: Square[];
  size: number;
  shape?: SquareShape;
}

const SquareComponent: SFC<Props> = ({ style, squares, size, shape }) => {
  const HEX_SQUARE_EMPTY_RATIO = 2 / Math.sqrt(3) - 1;
  const { game } = useContext(GameContext);

  const square = squares[0]; // TODO: How do we want to draw two squares in the same location. Answer: we don't - this shouldn't return a list.

  if (!square) {
    const emptySize = shape === SquareShape.Hex ? HEX_SQUARE_EMPTY_RATIO * size : size;
    return <View style={[style, { width: emptySize, height: emptySize }]} />;
  }
  if (square.hasTokenWithName(TokenName.InvisibilityToken)) return null;

  const backgroundColor = Colors.SQUARE[
    colorIndex({ ...square.getCoordinates(), shape })
  ].string();

  const piecesOnSquare = square.pieces;

  const dimension = Math.ceil(Math.sqrt(piecesOnSquare.length));
  const pieceScaleFactor = shape === SquareShape.Hex ? 0.9 : 1; // TODO: this will cause problems with chess plus and hex.
  const pieceSize = (pieceScaleFactor * size) / dimension;

  const onPress = (): void => {
    game.onPress(square);
  };

  const Highlight = game.allowableLocations.includes(square.location) ? (
    square.hasPiece() ? (
      <FullHighlight color={Colors.HIGHLIGHT.ERROR} />
    ) : (
      <CenterHighlight color={Colors.HIGHLIGHT.SUCCESS} />
    )
  ) : square.hasPieceOf(game.selectedPieces) ? (
    <FullHighlight color={Colors.HIGHLIGHT.WARNING} />
  ) : null;

  return (
    <PressableContainer
      style={[
        style,
        {
          width: size,
          height: size,
          backgroundColor,
          borderRadius: shape === SquareShape.Hex ? 50 : 0,
        },
      ]}
      onPress={onPress}
      activeOpacity={1}
    >
      {Highlight}
      <PositioningContainer size={pieceScaleFactor * size}>
        <GridArrangement>
          {piecesOnSquare.map((piece) => (
            <Piece piece={piece} size={pieceSize} key={piece.id} />
          ))}
        </GridArrangement>
      </PositioningContainer>
    </PressableContainer>
  );
};

const colorIndex = ({
  rank,
  file,
  shape,
}: {
  rank: number;
  file: number;
  shape?: SquareShape;
}): number => {
  return shape === SquareShape.Hex ? rank % 3 : (rank + file) % 2;
};

interface HighlightProps {
  color: Color;
}

const FullHighlight = styled(View)<HighlightProps>`
  background-color: ${({ color }): string => color.fade(0.5).string()};
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

const PressableContainer = styled(TouchableOpacity)`
  overflow: hidden;
`;

const PositioningContainer = styled(View)<{ size: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: ${({ size }): number => -size / 2}px;
  margin-top: ${({ size }): number => -size / 2}px;
`;

export { SquareComponent as Square };
