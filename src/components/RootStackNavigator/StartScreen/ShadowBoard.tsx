import React, { FC } from "react";
import { View } from "react-native";
import { GameProvider } from "game";
import { Board } from "components/shared/Board";
import { GameOptions } from "game/types";
import { Colors } from "primitives";
import styled from "styled-components/native";

interface Props {
  gameOptions: GameOptions;
}

const ShadowBoard: FC<Props> = ({ gameOptions }) => {
  return (
    <Container>
      <Board
        style={{
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 800,
          minWidth: 400,
          minHeight: 400,
        }}
        backboard={false}
      />
      <ShadowLayer />
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 24px;
  flex-direction: row;
  justify-content: center;
`;

const ShadowLayer = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${Colors.DARKEST.fade(0.1).toString()};
`;

export { ShadowBoard };
