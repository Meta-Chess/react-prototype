import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import { Colors, PieceImage, SFC, Text } from "primitives";
import { GameContext, PieceName, PlayerName } from "game";
import styled from "styled-components/native";
import { ButtonTertiaryLight, Row } from "ui";
import { Screens, useNavigation } from "navigation";
import { Styles } from "primitives/Styles";

export const WinModal: SFC<{ onClose: () => void }> = ({ onClose }) => {
  const { gameMaster } = useContext(GameContext);
  const navigation = useNavigation();

  return (
    <Container>
      <TitleRow>
        {gameMaster?.game.players
          .filter((player) => player.alive)
          .map((player) => (
            <PieceImage
              type={PieceName.King}
              color={Colors.PLAYER[player.name].toString()}
              size={40}
              key={player.name}
            />
          ))}
        <Text cat="DisplayM" style={{ marginLeft: 8 }} numberOfLines={1}>
          {gameMaster?.result}
        </Text>
      </TitleRow>
      <ScrollView
        style={{ flex: 1, maxHeight: 140 }}
        contentContainerStyle={{
          paddingTop: 8,
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {gameMaster?.game.players
          .filter((player) => !player.alive)
          .map((player) => (
            <Row style={{ alignItems: "center", marginTop: 4 }} key={player.name}>
              <PieceImage
                type={PieceName.King}
                color={Colors.PLAYER[player.name].toString()}
                size={32}
              />
              <Text cat="BodyM" style={{ marginLeft: 8, marginTop: 4 }} numberOfLines={1}>
                {[PlayerName[player.name], player.endGameMessage].join(" ") + "!"}
              </Text>
            </Row>
          ))}
      </ScrollView>
      <ButtonRow>
        <ButtonTertiaryLight
          onPress={(): void => {
            gameMaster?.endGame();
            navigation.navigate(Screens.StartScreen);
          }}
          text={"Done"}
          style={{ flex: 1 }}
        />
        <ButtonTertiaryLight
          onPress={onClose}
          text={"View Board"}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </ButtonRow>
    </Container>
  );
};

const Container = styled(View)`
  background-color: ${Colors.DARK.toString()};
  width: 350px;
  flex-direction: column;
  ${Styles.BOX_SHADOW}
`;

const TitleRow = styled(Row)`
  background-color: ${Colors.DARKISH.toString()};
  justify-content: center;
  align-items: center;
  padding-vertical: 4px;
`;

const ButtonRow = styled(Row)`
  background-color: ${Colors.DARKISH.toString()};
  padding: 4px;
`;
