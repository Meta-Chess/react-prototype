import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { SFC } from "primitives";
import { GridArrangement, Piece } from "./components";
import { GameContext } from "domain/State";
import { Square } from "domain/State/Board/Square";

interface Props {
  squares: Square[];
  size: number;
}

const squareColors = ["#41787c", "#e4e0d3"];

const SquareComponent: SFC<Props> = ({ style, squares, size }) => {
  const { gameState } = useContext(GameContext);

  const square = squares[0]; // TODO: How do we want to draw two squares in the same location
  if (!square) return <View style={[style, { width: size, height: size }]} />;

  const backgroundColor = squareColors[square.getColorIndex()];

  const piecesOnSquare = square.pieces;

  const dimension = Math.ceil(Math.sqrt(piecesOnSquare.length));
  const pieceSize = size / dimension;

  const onPress = (): void => {
    const board = gameState.board;
    const pieces = square.getPieceArray();
    const squares = [square];

    board.updateAdminMove(pieces, squares);
    /*
    if (pieces.length !== 0) {
      pieces[0].active = !pieces[0].active;
    } else {
      //do nothing
    }
    */
    gameState.render();
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
