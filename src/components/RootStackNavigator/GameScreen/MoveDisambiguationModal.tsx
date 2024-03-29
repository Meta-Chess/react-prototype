import React, { FC, useContext } from "react";
import { Platform, ScrollView, View } from "react-native";
import { CloseIcon, Colors, Text } from "primitives";
import { StaticBoard } from "components/shared/StaticBoard";
import { IconButton } from "ui/Buttons/IconButton";
import styled from "styled-components/native";
import { Styles } from "primitives/Styles";
import { GameContext } from "components/shared";
import { SquareShape, TokenName } from "game/types";

interface Props {
  flipBoard: boolean;
}

export const MoveDisambiguationModal: FC<Props> = ({ flipBoard }) => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;
  const moves = gameMaster.allowableMoves;
  const shape = gameMaster.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape;
  if (!moves) return null; // TODO: consider throwing an error?

  return (
    <Container>
      <Text cat={"DisplayM"} alignment={"center"} style={{ marginTop: 8 }}>
        {"Pick a move!"}
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
        {moves.map((move, index) => {
          const moveDemoGameMaster = gameMaster.clone({
            evaluateEndGameConditions: false,
          });
          moveDemoGameMaster.doMove({ move });
          return (
            <View key={index}>
              <StaticBoard
                gameMaster={moveDemoGameMaster}
                flipBoard={flipBoard}
                boardVisualisation={shape === SquareShape.Arc ? "circular" : "flat"}
                onPress={(): void => gameMaster.doMove({ move })}
                style={{ marginLeft: index > 0 ? 12 : undefined }}
              />
              <Text
                cat={"BodyXS"}
                alignment={"center"}
                style={{ marginTop: 4 }}
                color={Colors.TEXT.LIGHT_SECONDARY.toString()}
              >{`${index + 1}/${moves.length}`}</Text>
            </View>
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
  min-width: 300px;
  margin-horizontal: ${Platform.OS === "web" ? 24 : 0}px;
  background-color: ${Colors.DARKISH.toString()};
  ${Styles.BOX_SHADOW}
`;
