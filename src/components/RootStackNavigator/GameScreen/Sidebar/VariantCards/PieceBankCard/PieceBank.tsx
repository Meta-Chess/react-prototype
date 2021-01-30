import React from "react";
import { SFC, Colors, PieceImage } from "primitives";
import { GameMaster, Piece } from "game";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface Props {
  pieces: Piece[];
  pieceSize: number;
  gameMaster: GameMaster;
}

const PieceBank: SFC<Props> = ({ pieces, pieceSize, gameMaster }) => {
  return (
    <Container>
      {pieces.map((piece, index) => (
        <TouchableOpacity
          key={index}
          onPress={(): void => {
            gameMaster.onPress(piece.location, piece.id);
          }}
        >
          <PieceImage
            type={piece.name}
            color={Colors.PLAYER[piece.owner].string()}
            size={pieceSize}
            glowColor={
              gameMaster.selectedPieces.includes(piece)
                ? Colors.HIGHLIGHT.WARNING_LIGHT.toString()
                : "transparent"
            }
          />
        </TouchableOpacity>
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
