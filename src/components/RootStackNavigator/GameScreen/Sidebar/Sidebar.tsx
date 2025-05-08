import React, { useContext, useState } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { Button, Divider, useModals } from "ui";
import { useGoBackOrToMainScreen } from "navigation";
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

  const goBackOrToMainScreen = useGoBackOrToMainScreen();
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
  const toggleOfferDraw = (): void => {
    const assignedPlayer = gameMaster?.assignedPlayer;
    if (assignedPlayer !== undefined && assignedPlayer !== "spectator") {
      gameMaster?.toggleOfferDraw({
        playerName:
          assignedPlayer === "all"
            ? gameMaster.game.getCurrentPlayerName()
            : assignedPlayer,
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
          {isGameOver || isDead ? (
            <Button
              label="Leave Game"
              style={{ flex: 1 }}
              onPress={goBackOrToMainScreen}
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
