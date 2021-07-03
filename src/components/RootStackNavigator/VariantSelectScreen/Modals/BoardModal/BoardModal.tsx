import React from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { ButtonLight, ButtonSecondaryLight, Card, Footer } from "ui";
import { GameOptions } from "game";
import { Styles } from "primitives/Styles";
import styled from "styled-components/native";
import { ShadowBoard } from "components/RootStackNavigator/StartScreen";
import { GameProvider } from "components/shared";
import { calculateGameOptions } from "game";
import { ModalProps } from "../shared";

interface Props {
  gameOptions: GameOptions;
  setGameOptions: (gameOptions: GameOptions) => void;
}

export const BoardModal: SFC<ModalProps> = ({
  modalInfo,
  setModalInfo,
  gameOptions,
  setGameOptions,
  style,
}) => {
  return (
    <ModalCard style={style} title={"BOARD TEST"}>
      <Footer style={{ padding: 0 }} />
      <View style={{ flex: 1 }}>
        <GameProvider
          gameOptions={{
            ...calculateGameOptions(gameOptions, ["hex"]),
            time: undefined,
            online: false,
            flipBoard: false,
            checkEnabled: false,
          }}
          key={gameOptions.format === "variantComposition" ? 1 : 0}
        >
          <ShadowBoard showShadow={false} />
        </GameProvider>
      </View>
      <Footer style={{ padding: 8 }}>
        <ButtonSecondaryLight
          label={"Reset"}
          style={{ flex: 1 }}
          onPress={(): void => {
            return;
          }}
        />
        <ButtonLight
          label={"Done"}
          style={{ flex: 1, marginLeft: 8 }}
          onPress={(): void => {
            return;
          }}
        />
      </Footer>
    </ModalCard>
  );
};

const ModalCard = styled(Card)`
  ${Styles.BOX_SHADOW_STRONG}
  background-color: ${Colors.DARKER.toString()};
  height: 400px;
`;
