import React, { FC } from "react";
import { PieceImage } from "primitives";
import { Piece as PieceType } from "domain/Game/Board/Square/Piece";
import styled from "styled-components/native";
import { View } from "react-native";

interface Props {
  piece: PieceType; //TODO: FIX
  size: number;
}

const Piece: FC<Props> = ({ piece, size }) => {
  return (
    <Container>
      {piece.active || (
        <PieceImage type={piece.type} color={piece.owner} size={size} />
      )}
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  left: 0;
  top: 0;
`;

export { Piece };
