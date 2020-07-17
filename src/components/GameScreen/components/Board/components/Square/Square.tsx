import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SFC } from "primitives";
import { Coordinates } from "domain/types";
import { GridArrangement, Piece } from "./components";
import { GameContext, livePiecesAt } from "domain/gameState";

interface Props {
  location: Coordinates;
  size: number;
}

const Square: SFC<Props> = ({ style, location, size }) => {
  const backgroundColor = squareColor(location);

  const { gameState, setGameState } = useContext(GameContext);

  const piecesOnSquare = livePiecesAt(location, gameState);
  const dimension = Math.ceil(Math.sqrt(piecesOnSquare.length));
  const pieceSize = size / dimension;

  return (
    <SquareDiv
      style={[style, { maxWidth: size, maxHeight: size, backgroundColor }]}
      onPress={() => {}}
    >
      <GridArrangement>
        {piecesOnSquare.map((piece) => (
          <Piece piece={piece} size={pieceSize} key={piece.id} />
        ))}
      </GridArrangement>
    </SquareDiv>
  );
};

const SquareDiv = styled(TouchableOpacity)`
  flex: 1;
`;

export { Square };

export const squareColor = (location: Coordinates) =>
  isBlackSquare(location) ? "#41787c" : "#e4e0d3";

const isBlackSquare = ({ x, y }: Coordinates): boolean => (x - y) % 2 === 0;
