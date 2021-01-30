import React, { useContext, useState } from "react";
import { useWindowDimensions, ScrollView, View, TouchableOpacity } from "react-native";
import { Button, Card, useModals } from "ui";
import { Screens, useNavigation } from "navigation";
import { Colors, SFC } from "primitives";
import { GameContext, OnlineGameMaster } from "game";
import { RoomIdCard } from "./RoomIdCard";
import { VariantInfoCard } from "./VariantInfoCard";
import { RulesInfoCard } from "./RulesInfoCard";
import { PieceCredit } from "./PieceCredit";
import { SelectedPieceInfoCard } from "./SelectedPieceInfoCard";
import styled from "styled-components/native";
import { PlayersCard } from "./PlayersCard";

const Sidebar: SFC = ({ style }) => {
  const navigation = useNavigation();
  const modals = useModals();
  const { gameMaster } = useContext(GameContext);
  const pieces = gameMaster?.selectedPieces;
  const rules = gameMaster?.rules;
  const title = gameMaster?.title;
  const variant = gameMaster?.variant;
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

  return (
    <Container style={style}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={(): void => modals.hideAll()}
        scrollEventThrottle={100}
      >
        <TouchableOpacity
          style={{ flex: 1, paddingBottom: 24 }}
          onPress={(): void => modals.hideAll()}
          activeOpacity={1}
        >
          <View>
            <RoomIdCard roomId={roomId} style={{ marginBottom: 8 }} />
            <VariantInfoCard
              variant={variant}
              title={title}
              style={{ marginBottom: 8 }}
            />
            <PlayersCard style={{ marginBottom: 8 }} />
            <RulesInfoCard rules={rules} key={key} style={{ marginBottom: 8 }} />
            <SelectedPieceInfoCard
              pieces={pieces}
              key={key + 0.5}
              style={{ marginBottom: 8 }}
            />
            <Card>
              <PieceCredit />
            </Card>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <ButtonContainer>
        <Button
          text="Finish Game"
          onPress={(): void => {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.replace(Screens.StartScreen);
          }}
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled(View)`
  justify-content: space-between;
`;

const ButtonContainer = styled(View)`
  background-color: ${Colors.DARKEST.string()};
  padding-vertical: 8px;
`;

export { Sidebar };
