import React, { FC, useContext } from "react";
import {
  Platform,
  useWindowDimensions,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { GameContext } from "game";
import {
  Board,
  BoardMeasurements,
  calculateBoardMeasurements,
} from "components/shared/Board";
import { Sidebar } from "./Sidebar";
import { Player, TokenName } from "game/types";
import { useFlipDelay } from "components/shared/Board/useFlipDelay";
import { PlayerRow } from "./PlayerRow";
import { Spinner, useModals } from "ui";
import { Colors } from "primitives";
import styled from "styled-components/native";

const PLAYER_ROW_HEIGHT = 64;

export const GameScreenContent: FC = () => {
  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  const modals = useModals();
  const { gameMaster } = useContext(GameContext);
  const { flipBoard } = useFlipDelay(gameMaster?.game?.currentPlayer);
  if (!gameMaster) return <Spinner />;

  const shape = gameMaster.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape;

  const backboard = Platform.OS === "web";
  const padding = Platform.OS === "web" ? 16 : 0;

  const boardMeasurements = calculateBoardMeasurements({
    game: gameMaster.game,
    boardAreaWidth: portrait ? width - 2 * padding : (2 * width) / 3 - 2 * padding,
    boardAreaHeight:
      (portrait ? Math.min((3 * height) / 4, height - 200) : height) -
      2 * PLAYER_ROW_HEIGHT -
      2 * padding,
    shape,
    backboard,
  });

  return (
    <StyledTouchableWithoutFeedback onPress={modals.hideAll}>
      <Container style={{ flexDirection: portrait ? "column" : "row", padding }}>
        <View>
          <PlayerRow
            player={flipBoard ? Player.White : Player.Black}
            style={{ height: PLAYER_ROW_HEIGHT }}
          />
          <Board
            measurements={boardMeasurements}
            backboard={backboard}
            flipBoard={flipBoard}
          />
          <PlayerRow
            player={flipBoard ? Player.Black : Player.White}
            style={{ height: PLAYER_ROW_HEIGHT }}
          />
        </View>
        <SidebarContainer portrait={portrait} boardMeasurements={boardMeasurements}>
          <Sidebar short={portrait} style={{ flex: 1 }} />
        </SidebarContainer>
      </Container>
    </StyledTouchableWithoutFeedback>
  );
};

const StyledTouchableWithoutFeedback = styled(TouchableWithoutFeedback)`
  display: flex;
  flex: 1;
`;

const Container = styled(SafeAreaView)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${Colors.DARKEST.string()};
  flex: 1;
`;

interface SidebarContainerProps {
  portrait: boolean;
  boardMeasurements: BoardMeasurements;
}

const SidebarContainer = styled(View)<SidebarContainerProps>`
  flex: 1;
  ${({ portrait, boardMeasurements }): string =>
    portrait ? "" : `height: ${boardMeasurements.height}px;`}
  ${({ portrait, boardMeasurements }): string =>
    portrait ? `width: ${boardMeasurements.width}px;` : ""}
  min-width: 300px;
  max-width: 450px;
  padding: ${Platform.OS === "web" ? 0 : 8}px;
  margin-left: ${({ portrait }): number => (portrait ? 0 : 16)}px;
`;
