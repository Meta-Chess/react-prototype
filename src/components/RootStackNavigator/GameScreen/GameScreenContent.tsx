import React, { FC, useContext } from "react";
import {
  Platform,
  useWindowDimensions,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { GameContext } from "game";
import { Board, calculateBoardMeasurements } from "components/shared/Board";
import { Sidebar } from "./Sidebar";
import { GlobalModal } from "./GlobalModal";
import { Player, TokenName } from "game/types";
import { useFlipDelay } from "components/shared/Board/useFlipDelay";
import { PlayerRow } from "./PlayerRow";
import { Spinner } from "ui";
import { Colors } from "primitives";
import styled from "styled-components/native";

const PLAYER_ROW_HEIGHT = 56;

export const GameScreenContent: FC = () => {
  const { height, width } = useWindowDimensions();
  const portrait = height > width;

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
    <StyledTouchableWithoutFeedback onPress={(): void => gameMaster?.hideModal()}>
      <StyledContainer style={{ flexDirection: portrait ? "column" : "row", padding }}>
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
        <Sidebar
          short={portrait}
          style={{
            flex: 1,
            marginLeft: 16,
            height: portrait
              ? height - boardMeasurements.height - 2 * PLAYER_ROW_HEIGHT - 2 * padding
              : boardMeasurements.height,
            minWidth: 300,
            maxWidth: 450,
            width: portrait ? boardMeasurements.width : undefined,
          }}
        />
        <GlobalModal />
      </StyledContainer>
    </StyledTouchableWithoutFeedback>
  );
};

const StyledTouchableWithoutFeedback = styled(TouchableWithoutFeedback)`
  display: flex;
  width: 100%;
  height: 100%;
`;

const StyledContainer = styled(View)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${Colors.DARKEST.string()};
  width: 100%;
  height: 100%;
`;
