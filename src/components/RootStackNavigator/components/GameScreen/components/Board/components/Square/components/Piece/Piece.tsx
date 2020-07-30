import React, { useContext } from "react";
import { SFC } from "primitives";
import { PieceImage } from "primitives";
import { GameContext } from "domain/State";
import { Piece as PieceType } from "domain/State/Board/Square/Piece";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

interface Props {
  piece: PieceType; //TODO: FIX THIS
  size: number;
}

const Piece: SFC<Props> = ({ style, piece, size }) => {
  const { gameState } = useContext(GameContext);

  const onPress = (): void => {
    piece.active = !piece.active;
    gameState.render();
  };

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
      onPress={onPress}
    >
      {/* {piece.active && (
        <Container>
          <PieceHighlight type={piece.type} color={piece.active} size={size} />
        </Container>
      )} */}
      <Container>
        {piece.active || (
          <PieceImage type={piece.type} color={piece.owner} size={size} />
        )}
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
