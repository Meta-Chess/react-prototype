import React from "react";
import { SFC, Colors, Text } from "primitives";
import { GameMaster, Piece as PieceClass } from "game";
import { Piece } from "components/shared";
import { View } from "react-native";
import styled from "styled-components/native";
import { AbsoluteView } from "ui";

interface Props {
  pieces: PieceClass[];
  pieceSize: number;
  gameMaster: GameMaster;
}

const PieceBank: SFC<Props> = ({ pieces, pieceSize, gameMaster, style }) => {
  return (
    <Container style={[style, { minHeight: pieceSize }]}>
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
            gameMaster.onPress(piece.location, piece.id);
          }}
          key={index}
        />
      ))}
      {pieces.length === 0 && (
        <AbsoluteView style={{ alignItems: "flex-start" }}>
          <Text
            cat="BodyS"
            color={Colors.TEXT.LIGHT_SECONDARY.toString()}
            style={{ fontStyle: "italic", marginLeft: 4 }}
          >
            {"No pieces captured"}
          </Text>
        </AbsoluteView>
      )}
    </Container>
  );
};
export { PieceBank };

const Container = styled(View)`
  flex-wrap: wrap;
  flex-direction: row;
`;
