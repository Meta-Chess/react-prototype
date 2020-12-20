import React, { useContext, useState } from "react";
import {
  useWindowDimensions,
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Card, useModals } from "ui";
import { Screens, useNavigation } from "navigation";
import { Colors, SFC } from "primitives";
import { GameContext } from "game";
import { RoomIdCard } from "./RoomIdCard";
import { VariantInfoCard } from "./VariantInfoCard";
import { RulesInfoCard } from "./RulesInfoCard";
import { PieceCredit } from "./PieceCredit";
import { SelectedPieceInfoCard } from "./SelectedPieceInfoCard";
import { OnlineGameMaster } from "game/OnlineGameMaster";
import styled from "styled-components/native";

interface Props {
  short?: boolean;
}

const Sidebar: SFC<Props> = ({ style }) => {
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
        contentContainerStyle={{ paddingBottom: 24 }}
        onScroll={(): void => modals.hideAll()}
        scrollEventThrottle={100}
      >
        <TouchableWithoutFeedback onPress={(): void => modals.hideAll()}>
          <View>
            <RoomIdCard roomId={roomId} />
            <VariantInfoCard
              variant={variant}
              title={title}
              style={{ marginTop: roomId ? 8 : 0 }}
            />
            <RulesInfoCard rules={rules} key={key} style={{ marginTop: 8 }} />
            <SelectedPieceInfoCard
              pieces={pieces}
              key={key + 0.5}
              style={{ marginTop: 8 }}
            />
            <Card style={{ marginTop: 8 }}>
              <PieceCredit />
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <ButtonContainer>
        <Button
          text="Finish Game"
          onPress={(): void => {
            gameMaster?.endGame();
            navigation.navigate(Screens.StartScreen);
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
