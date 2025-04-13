import React, { useCallback, useContext, useState } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { Button, Divider, useModals } from "ui";
import { useGoBackOrToStartScreen } from "navigation";
import { Colors, SFC } from "primitives";
import { OnlineGameMaster, PlayerName } from "game";
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
  const getRelevantPlayerNames = useCallback((): PlayerName[] => {
    if (!gameMaster) return [];
    const assignedPlayers = gameMaster.assignedPlayers;
    const currentPlayer = gameMaster.game.getCurrentPlayerName();

    if (assignedPlayers.length === 1) return [assignedPlayers[0]];
    else if (assignedPlayers.includes(currentPlayer)) return [currentPlayer];
    else return assignedPlayers;
  }, [gameMaster]);
  const doResign = (): void => {
    getRelevantPlayerNames().forEach((playerName) =>
      gameMaster?.doResign({ resignation: { playerName } })
    );
  };
  const toggleOfferDraw = useCallback((): void => {
    getRelevantPlayerNames().forEach((playerName) =>
      gameMaster?.toggleOfferDraw({ playerName })
    );
  }, [gameMaster]);
  const isGameOver = gameMaster?.gameOver;
  const userIsAlive = gameMaster?.game
    .alivePlayers()
    .some((alivePlayer) => gameMaster?.assignedPlayers.includes(alivePlayer.name));
  const othersAreAlive = gameMaster?.game
    .alivePlayers()
    .some((alivePlayer) => !gameMaster?.assignedPlayers.includes(alivePlayer.name));

  return (
    <Container style={style}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}
        onScroll={(): void => modals.hideAll()}
        scrollEventThrottle={100}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <RoomIdCard roomId={roomId} />
          <VariantInfoCard />
          <PlayersCard />
          <VariantCards />
          <SelectedPieceInfoCard pieces={pieces} key={key + 0.5} />
        </View>
      </ScrollView>
      <Divider>
        {!gameMaster?.getRuleNames().includes("longBoard") && (
          <HalfContainer style={{ marginRight: 12 }}>
            <BackHistoryButton style={{ flex: 1 }} />
            <ForwardHistoryButton style={{ flex: 1, marginLeft: 12 }} />
          </HalfContainer>
        )}
        <HalfContainer>
          {isGameOver || !userIsAlive || !othersAreAlive ? (
            <Button
              label="Leave Game"
              style={{ flex: 1 }}
              onPress={goBackOrToStartScreen}
            />
          ) : (
            <>
              <DrawButton onPress={toggleOfferDraw} style={{ flex: 1 }} />
              <ConcedeButton onPress={doResign} style={{ flex: 1, marginLeft: 12 }} />
            </>
          )}
        </HalfContainer>
      </Divider>
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
