import React, { useContext, FC } from "react";
import { allPossiblePlayerNames, Piece as PieceClass } from "game";
import { View, ScrollView, Platform } from "react-native";
import { CloseIcon, Colors, Text } from "primitives";
import { IconButton } from "ui/Buttons/IconButton";
import styled from "styled-components/native";
import { Styles } from "primitives/Styles";
import { isEqual, uniqWith } from "lodash";
import { isPresent } from "ts-is-present";
import { GameContext, Piece } from "components/shared";

interface Props {
  promotion: {
    pieceId: string;
    location: string;
  };
  pieceSize: number;
}

export const PromotionDisambiguationModal: FC<Props> = ({ promotion, pieceSize }) => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;

  const moves = gameMaster?.allowableMoves;
  const promotionPieces = uniqWith(
    moves?.map((move) => {
      const delta = move.pieceDeltas.find((delta) => delta.pieceId === promotion.pieceId);
      if (!delta || !delta.promoteTo) return undefined;
      return {
        pieceType: delta.promoteTo,
        owner:
          gameMaster.game.board.findPieceById(delta.pieceId)?.owner ||
          allPossiblePlayerNames[0],
      };
    }),
    isEqual
  ).filter(isPresent);
  if (!promotionPieces || !promotionPieces.length) return null;

  return (
    <Container>
      <Text cat={"DisplayM"} alignment={"center"} style={{ marginTop: 8 }}>
        {"Pick a promotion!"}
      </Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-around",
          paddingHorizontal: Platform.OS === "web" ? 24 : 8,
          paddingVertical: 12,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {promotionPieces.map((promotionPiece, index) => {
          return (
            <Piece
              piece={new PieceClass(promotionPiece.pieceType, promotionPiece.owner)}
              size={pieceSize}
              key={index}
              onPress={(): void => {
                gameMaster.filterAllowableMoves((move): boolean =>
                  move.pieceDeltas.some(
                    (delta) =>
                      delta.pieceId === promotion.pieceId &&
                      delta.promoteTo === promotionPiece.pieceType
                  )
                );
              }}
            />
          );
        })}
      </ScrollView>
      <IconButton
        style={{ position: "absolute", top: 8, right: 8 }}
        Icon={CloseIcon}
        onPress={(): void => {
          gameMaster.unselectAllPieces();
          gameMaster.render();
        }}
      />
    </Container>
  );
};

const Container = styled(View)`
  flex-shrink: 1;
  margin-horizontal: ${Platform.OS === "web" ? 24 : 0}px;
  background-color: ${Colors.DARKISH.toString()};
  ${Styles.BOX_SHADOW}
`;
