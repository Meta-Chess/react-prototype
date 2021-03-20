import React, { useContext, useState } from "react";
import { ScrollView, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Button, Footer, useModals } from "ui";
import { useGoBackOrToStartScreen } from "navigation";
import { Colors, SFC } from "primitives";
import { OnlineGameMaster } from "game";
import { RoomIdCard } from "./RoomIdCard";
import { VariantInfoCard } from "./VariantInfoCard";
import { SelectedPieceInfoCard } from "./SelectedPieceInfoCard";
import { VariantCards } from "./VariantCards";
import styled from "styled-components/native";
import { PlayersCard } from "./PlayersCard";
import { Styles } from "primitives/Styles";
import {
  BackHistoryButton,
  ConcedeButton,
  DrawButton,
  ForwardHistoryButton,
} from "./ControlButtons";
import { GameContext } from "components/shared";

const Sidebar: SFC = ({ style }) => {
  const modals = useModals();
  const { gameMaster } = useContext(GameContext);
  const pieces = gameMaster?.selectedPieces;
  const roomId = gameMaster instanceof OnlineGameMaster ? gameMaster?.roomId : undefined;

  const { width, height } = useWindowDimensions();

  const [key, setKey] = useState(0);
  const k =
    width +
    height +
    (pieces || []).reduce((sum, p): number => sum + parseInt(p.id || "0", 36), 0); // We should maybe create a function like "hash by id" for this purpose?
  if (k !== key) {
    setKey(k);
  }

  const goBackOrToStartScreen = useGoBackOrToStartScreen();
  const doResign = (): void => {
    const assignedPlayer = gameMaster?.assignedPlayer;
    if (assignedPlayer !== undefined && assignedPlayer !== "spectator") {
      gameMaster?.doResign({
        resignation: {
          playerName:
            assignedPlayer === "all"
              ? gameMaster.game.getCurrentPlayerName()
              : assignedPlayer,
        },
      });
    }
  };
  const isGameOver = gameMaster?.gameOver;
  const isDead =
    gameMaster?.assignedPlayer === "all" ||
    gameMaster?.assignedPlayer === "spectator" ||
    !gameMaster?.game
      .alivePlayers()
      .map((p) => p.name)
      .includes(gameMaster?.assignedPlayer);

  return (
    <Container style={style}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}
        onScroll={(): void => modals.hideAll()}
        scrollEventThrottle={100}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{ flex: 1, paddingBottom: 24 }}
          onPress={(): void => modals.hideAll()}
          activeOpacity={1}
          accessible={false}
        >
          <View>
            <RoomIdCard roomId={roomId} />
            <VariantInfoCard />
            <PlayersCard />
            <VariantCards />
            <SelectedPieceInfoCard pieces={pieces} key={key + 0.5} />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Footer>
        <HalfContainer>
          <BackHistoryButton style={{ flex: 1 }} />
          <ForwardHistoryButton style={{ flex: 1, marginLeft: 12 }} />
        </HalfContainer>
        <HalfContainer style={{ marginLeft: 12 }}>
          {isGameOver || isDead ? (
            <Button
              label="Leave Game"
              style={{ flex: 1 }}
              onPress={goBackOrToStartScreen}
            />
          ) : (
            <>
              <DrawButton
                onPress={(): void => {
                  return;
                }}
                style={{ flex: 1 }}
              />
              <ConcedeButton onPress={doResign} style={{ flex: 1, marginLeft: 12 }} />
            </>
          )}
        </HalfContainer>
      </Footer>
    </Container>
  );
};

const Container = styled(View)`
  justify-content: space-between;
  background-color: ${Colors.DARKER.toString()};
  border-width: 1px;
  border-color: ${Colors.DARKISH.toString()};
  ${Styles.BOX_SHADOW}
`;

const HalfContainer = styled(View)`
  flex: 1;
  flex-direction: row;
`;

export { Sidebar };
