import React, { useContext, FC } from "react";
import { GameContext } from "game";
import { View, ScrollView, Platform } from "react-native";
import { CloseIcon, Colors, Text } from "primitives";
import { StaticBoard } from "components/shared/StaticBoard";
import { IconButton } from "ui/Buttons/IconButton";
import styled from "styled-components/native";
import { Styles } from "primitives/Styles";

export const MoveDisambiguationModal: FC = () => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;
  const moves = gameMaster?.allowableMoves;

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
          const moveDemoGameMaster = gameMaster.clone();
          moveDemoGameMaster.doMove(move);
          return (
            <View key={index}>
              <StaticBoard
                gameMaster={moveDemoGameMaster}
                onPress={(): void => gameMaster.doMove(move)}
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
        style={{ position: "absolute", top: 12, right: 12 }}
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
  align-self: stretch;
  margin-horizontal: ${Platform.OS === "web" ? 24 : 0}px;
  border-radius: ${Platform.OS === "web" ? 4 : 0}px;
  background-color: ${Colors.DARKISH.toString()};
  ${Styles.BOX_SHADOW}
`;
