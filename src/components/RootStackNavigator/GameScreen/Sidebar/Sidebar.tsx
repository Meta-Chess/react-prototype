import React, { useContext, useState } from "react";
import { useWindowDimensions, ScrollView, View, TouchableOpacity } from "react-native";
import { Button, Card, useModals, HorizontalSeparator } from "ui";
import { useGoBackOrToStartScreen } from "navigation";
import { Colors, SFC } from "primitives";
import { GameContext, OnlineGameMaster } from "game";
import { RoomIdCard } from "./RoomIdCard";
import { VariantInfoCard } from "./VariantInfoCard";
import { PieceCredit } from "./PieceCredit";
import { SelectedPieceInfoCard } from "./SelectedPieceInfoCard";
import { VariantCards } from "./VariantCards";
import styled from "styled-components/native";
import { PlayersCard } from "./PlayersCard";
import { Styles } from "primitives/Styles";

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
        >
          <View>
            <RoomIdCard roomId={roomId} />
            <VariantInfoCard />
            <PlayersCard />
            <VariantCards />
            <SelectedPieceInfoCard pieces={pieces} key={key + 0.5} />
            <Card>
              <PieceCredit />
            </Card>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <HorizontalSeparator color={Colors.DARKISH.fade(0.55).toString()} />
      <ButtonContainer>
        <Button text="Finish Game" onPress={goBackOrToStartScreen} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled(View)`
  justify-content: space-between;
  background-color: ${Colors.DARKER.toString()};
  border-width: 1px;
  border-color: ${Colors.DARKISH.toString()};
  margin: 4px 0px 4px 4px;
  ${Styles.BOX_SHADOW}
`;

const ButtonContainer = styled(View)`
  margin: 24px;
`;

export { Sidebar };
