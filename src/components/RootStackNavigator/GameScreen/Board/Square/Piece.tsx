import React, { FC, useContext } from "react";
import { PieceImage } from "primitives";
import { opacify } from "utilities";
import { GameContext } from "domain/Game";
import { Piece as PieceClass } from "domain/Game/Board";
import styled from "styled-components/native";
import { View } from "react-native";

interface Props {
  piece: PieceClass;
  size: number;
}

const Piece: FC<Props> = ({ piece, size }) => {
  const { game } = useContext(GameContext);
  const isHighlighted = game.selectedPieces.map((p) => p.id).includes(piece.id);
  return (
    <>
      <Container>
        {isHighlighted && (
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
  background-color: ${opacify("#D55", 0.4)};
  border: 1px solid ${opacify("#666", 0.8)};
`;

const Container = styled(View)`
  position: absolute;
  left: 0;
  top: 0;
`;

export { Piece };
