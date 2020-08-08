import React, { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SFC } from "primitives";
import { Piece } from "./Piece";
import { GridArrangement } from "./GridArrangement";
import { GameContext } from "domain/Game";
import { Square } from "domain/Game/Board";
import Color from "color";

interface Props {
  squares: Square[];
  size: number;
}

const highlightedSquareColors = ["#41C87C", "#C4FFC3"];

const SquareComponent: SFC<Props> = ({ style, squares, size }) => {
  const fullLight = [100, 200, 175];
  const fullDark = [0, 150, 250];
  const lightMixer = [180, 180, 180];
  const darkMixer = [130, 130, 130];
  const [deg, setDeg] = useState(0);
  setTimeout(() => {
    setDeg(deg + 1);
  }, 80);

  const mix = 0.9;
  const dark = Color.rgb(
    [0, 1, 2].map((i) => (1 - mix) * fullDark[i] + mix * darkMixer[i])
  )
    .rotate(deg)
    .string();
  const light = Color.rgb(
    [0, 1, 2].map((i) => (1 - mix) * fullLight[i] + mix * lightMixer[i])
  )
    .rotate(deg)
    .string();

  const squareColors = [dark, light];

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
