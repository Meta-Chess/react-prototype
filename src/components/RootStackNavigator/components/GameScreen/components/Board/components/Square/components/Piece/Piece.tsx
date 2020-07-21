import React, { useContext } from "react";
import { SFC } from "primitives";
import { PieceImage, PieceHighlight } from "primitives";
import { GameContext } from "domain/gameState";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

interface Props {
  piece: any; //TODO: FIX
  size: number;
}

const Piece: SFC<Props> = ({ style, piece, size }) => {
  const { gameState, setGameState } = useContext(GameContext);

  return (
    <TouchableOpacity
      style={[
        style,
        {
          height: size,
          width: size,
          position: "relative",
        },
      ]}
      onPress={() => {}}
    >
      {/* {piece.active && (
        <Container>
          <PieceHighlight type={piece.type} color={piece.active} size={size} />
        </Container>
      )} */}
      <Container>
        <PieceImage type={piece.type} color={piece.owner} size={size} />
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled(View)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
`;

export { Piece };
