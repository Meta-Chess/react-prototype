import React, { FC } from "react";
import { PieceImage } from "primitives";
import { opacify } from "utilities";
import { Piece as PieceClass } from "domain/Game/Board/Square/Piece";
import { PieceType } from "domain/Game/types";
import styled from "styled-components/native";
import { View } from "react-native";

interface Props {
  piece: PieceClass; //TODO: FIX
  size: number;
}

const Piece: FC<Props> = ({ piece, size }) => {
  return (
    <>
      <Container>
        {piece.type === PieceType.Queen && (
          <Highlight
            style={{
              width: size,
              height: size,
            }}
          />
        )}
      </Container>

      <Container>
        <PieceImage type={piece.type} color={piece.owner} size={size} />
      </Container>
    </>
  );
};

const Highlight = styled(View)`
  background-color: ${opacify("#999", 0.4)};
  border: 1px solid ${opacify("#666", 0.8)};
`;

const Container = styled(View)`
  position: absolute;
  left: 0;
  top: 0;
`;

export { Piece };
