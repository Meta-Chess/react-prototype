import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { SFC } from "primitives";
import { Piece } from "./Piece";
import { GridArrangement } from "./GridArrangement";
import { GameContext } from "domain/Game";
import { Square } from "domain/Game/Board";

interface Props {
  squares: Square[];
  size: number;
}

const squareColors = ["#41787c", "#e4e0d3"];
const highlightedSquareColors = ["#41C87C", "#C4FFC3"];

const SquareComponent: SFC<Props> = ({ style, squares, size }) => {
  const { game } = useContext(GameContext);

  const square = squares[0]; // TODO: How do we want to draw two squares in the same location
  if (!square) return <View style={[style, { width: size, height: size }]} />;

  const isHighlighted = game.allowableLocations.includes(square.location);

  const backgroundColor = isHighlighted
    ? highlightedSquareColors[square.getColorIndex()]
    : squareColors[square.getColorIndex()];

  const piecesOnSquare = square.pieces;

  const dimension = Math.ceil(Math.sqrt(piecesOnSquare.length));
  const pieceSize = size / dimension;

  const onPress = (): void => {
    game.onPress(square);
    // const board = game.board;
    // const pieces = square.getPieceArray();
    // const squares = [square];

    // board.updateAdminMove(pieces, squares);
    // /*
    // if (pieces.length !== 0) {
    //   pieces[0].active = !pieces[0].active;
    // } else {
    //   //do nothing
    // }
    // */
    // game.render();
  };

  return (
    <TouchableOpacity
      style={[style, { width: size, height: size, backgroundColor }]}
      onPress={onPress}
      activeOpacity={1}
    >
      <GridArrangement>
        {piecesOnSquare.map((piece) => (
          <Piece piece={piece} size={pieceSize} key={piece.id} />
        ))}
      </GridArrangement>
    </TouchableOpacity>
  );
};

export { SquareComponent as Square };
