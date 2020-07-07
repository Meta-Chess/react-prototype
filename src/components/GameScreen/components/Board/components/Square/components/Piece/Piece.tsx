import React, { FC, useContext } from "react";
import { PieceImage, PieceHighlight } from "primitives";
import { GameContext } from "domain/gameState";
import { Piece as PieceType } from "domain/types";
import { onClickPiece } from "domain/elements";
import styled from "styled-components";
import {TouchableOpacity, View} from "react-native";

interface Props {
  piece: PieceType;
  size: number;
}

const Piece: FC<Props> = ({ piece, size }) => {
  const { gameState, setGameState } = useContext(GameContext);

  return (
    <TouchableOpacity
      style={{ height: size, width: size, position: "relative" }}
      onPress={onClickPiece(gameState, setGameState, piece)}
    >
      {piece.active && (
        <Container>
          <PieceHighlight type={piece.type} color={piece.active} size={size} />
        </Container>
      )}
      <Container>
        <PieceImage type={piece.type} color={piece.color} size={size} />
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
