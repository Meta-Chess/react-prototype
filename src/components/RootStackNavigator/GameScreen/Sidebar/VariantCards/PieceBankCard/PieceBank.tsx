import React from "react";
import { SFC, Colors } from "primitives";
import { GameMaster, Piece as PieceClass } from "game";
import { Piece } from "components/shared";
import { View } from "react-native";
import styled from "styled-components/native";

interface Props {
  pieces: PieceClass[];
  pieceSize: number;
  gameMaster: GameMaster;
}

const PieceBank: SFC<Props> = ({ pieces, pieceSize, gameMaster }) => {
  return (
    <Container>
      {pieces.map((piece, index) => (
        <Piece
          piece={piece}
          size={pieceSize}
          glowColor={
            gameMaster.selectedPieces.includes(piece)
              ? Colors.HIGHLIGHT.WARNING_LIGHT.toString()
              : "transparent"
          }
          onPress={(): void => {
            gameMaster.onSquarePress(piece.location, piece.id);
          }}
          key={index}
        />
      ))}
      {pieces.length === 0 && <View style={{ height: pieceSize, width: pieceSize }} />}
    </Container>
  );
};
export { PieceBank };

const Container = styled(View)`
  flex-wrap: wrap;
  flex-direction: row;
`;
