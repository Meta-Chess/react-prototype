import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import Color from "color";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { Piece } from "./Piece";
import { GridArrangement } from "./GridArrangement";
import { GameContext } from "domain/Game";
import { Square } from "domain/Game/Board";
import { TokenName, SquareShape } from "domain/Game/types";

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

  const isHighlighted = game.allowableLocations.includes(square.location);
  const backgroundColor = Colors.SQUARE[
    colorIndex({ ...square.getCoordinates(), shape })
  ].string();

  const piecesOnSquare = square.pieces;

  const dimension = Math.ceil(Math.sqrt(piecesOnSquare.length));
  const pieceSize = (0.88 * size) / dimension;

  const onPress = (): void => {
    game.onPress(square);
  };

  return (
    <TouchableOpacity
      style={[
        style,
        {
          width: size,
          height: size,
          backgroundColor,
          padding: "6%",
          borderRadius: shape === SquareShape.Hex ? 50 : 0,
        },
      ]}
      onPress={onPress}
      activeOpacity={1}
    >
      {isHighlighted && (
        <Highlight
          color={square.hasPiece() ? Colors.HIGHLIGHT.ERROR : Colors.HIGHLIGHT.SUCCESS}
        />
      )}
      <GridArrangement>
        {piecesOnSquare.map((piece) => (
          <Piece piece={piece} size={pieceSize} key={piece.id} />
        ))}
      </GridArrangement>
    </TouchableOpacity>
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
  return shape === SquareShape.Hex ? rank % 3 : (rank + file) % 3;
};

interface HighlightProps {
  color: Color;
  shape?: SquareShape;
}

const Highlight = styled(View)<HighlightProps>`
  background-color: ${({ color }): string => color.fade(0.6).string()};
  position: absolute;
  border-radius: ${({ shape }): string => (shape === SquareShape.Hex ? "300px" : "12px")}
  top: 8%;
  right: 8%;
  bottom: 8%;
  left: 8%;
`;

export { SquareComponent as Square };
