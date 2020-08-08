import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import Color from "color";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { Piece } from "./Piece";
import { GridArrangement } from "./GridArrangement";
import { GameContext } from "domain/Game";
import { Square } from "domain/Game/Board";

interface Props {
  squares: Square[];
  size: number;
}

const SquareComponent: SFC<Props> = ({ style, squares, size }) => {
  const { game } = useContext(GameContext);

  const square = squares[0]; // TODO: How do we want to draw two squares in the same location
  if (!square) return <View style={[style, { width: size, height: size }]} />;

  const isHighlighted = game.allowableLocations.includes(square.location);
  const backgroundColor = Colors.SQUARE[square.getColorIndex()].string();

  const piecesOnSquare = square.pieces;

  const dimension = Math.ceil(Math.sqrt(piecesOnSquare.length));
  const pieceSize = (0.88 * size) / dimension;

  const onPress = (): void => {
    game.onPress(square);
  };

  return (
    <TouchableOpacity
      style={[style, { width: size, height: size, backgroundColor, padding: "6%" }]}
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

interface HighlightProps {
  color: Color;
}

const Highlight = styled(View)<HighlightProps>`
  background-color: ${({ color }): string => color.fade(0.6).string()};
  position: absolute;
  border-radius: 12px
  top: 8%;
  right: 8%;
  bottom: 8%;
  left: 8%;
`;

export { SquareComponent as Square };
