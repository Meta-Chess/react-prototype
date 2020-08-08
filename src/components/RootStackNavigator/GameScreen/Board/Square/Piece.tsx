import React, { FC, useContext } from "react";
import { PieceImage, Colors } from "primitives";
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
        <PieceImage
          type={piece.type}
          color={Colors.PLAYER[piece.owner].string()}
          size={size}
        />
      </Container>
    </>
  );
};

const Highlight = styled(View)`
  background-color: ${Colors.HIGHLIGHT.WARNING.fade(0.6).string()};
  border-radius: 12px;
`;

const Container = styled(View)`
  position: absolute;
  left: 0;
  top: 0;
`;

export { Piece };
