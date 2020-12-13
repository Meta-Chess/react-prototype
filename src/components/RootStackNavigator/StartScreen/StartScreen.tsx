import React, { FC, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Colors, MChessLogo } from "primitives";
import { Row } from "ui";
import { GameProvider } from "game";
import { GameOptions } from "game/types";
import { defaultGameOptions, GameOptionControls } from "./GameOptionControls";
import { ShadowBoard } from "./ShadowBoard";
import { StartButton } from "./StartButton";
import { SetupGameButton } from "./SetupGameButton";
import { StartScreenLayoutContainer } from "./StartScreenLayoutContainer";

const StartScreen: FC = () => {
  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);

  return (
    <GameProvider
      gameOptions={{ ...gameOptions, time: undefined, online: false, flipBoard: false }}
    >
      <ScreenContainer>
        <StartScreenLayoutContainer
          a={
            <>
              <ShadowBoard />
              <MChessLogo />
            </>
          }
          b={
            <>
              <GameOptionControls
                gameOptions={gameOptions}
                setGameOptions={setGameOptions}
              />
              <Row style={{ marginTop: 24, width: 300 }}>
                <StartButton gameOptions={gameOptions} style={{ flex: 1 }} />
                <SetupGameButton style={{ flex: 1, marginLeft: 8 }} />
              </Row>
            </>
          }
        />
      </ScreenContainer>
    </GameProvider>
  );
};

const ScreenContainer = styled(View)`
  display: flex;
  flex: 1;
  background-color: ${Colors.DARKEST.string()};
`;

export { StartScreen };
