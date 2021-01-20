import React, { FC, useContext, useCallback, useState } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import { GameContext } from "game";
import {
  Board,
  BoardMeasurements,
  calculateBoardMeasurements,
} from "components/shared/Board";
import { Sidebar } from "./Sidebar";
import { PlayerName, SquareShape, TokenName } from "game";
import { useFlipDelay } from "components/shared/Board/useFlipDelay";
import { PlayerRow } from "./PlayerRow";
import { AbsoluteView, Spinner } from "ui";
import styled from "styled-components/native";
import { HelpMenu, ScreenContainer } from "components/shared";
import { WinModal } from "components/shared/Board/WinModal";
import { MoveDisambiguationModal } from "components/shared/Board/MoveDisambiguationModal";

const PLAYER_ROW_HEIGHT = 64;

export const GameScreenContent: FC = () => {
  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  const { gameMaster } = useContext(GameContext);
  const [winModalHidden, setWinModalHidden] = useState(false);
  const hideWinModal = useCallback(() => setWinModalHidden(true), []);
  const moveDisambiguationRequired =
    gameMaster?.locationSelected && (gameMaster?.allowableMoves.length || 0) > 1;
  const { flipBoard } = useFlipDelay(gameMaster?.game?.currentPlayerIndex);
  if (!gameMaster)
    return (
      <StyledContainer>
        <Spinner />
      </StyledContainer>
    );

  const shape = gameMaster.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape;

  const backboard = Platform.OS === "web";
  const padding = Platform.OS === "web" || shape === SquareShape.Hex ? 16 : 0;

  const boardMeasurements = calculateBoardMeasurements({
    board: gameMaster.game.board,
    boardAreaWidth: portrait
      ? width - 2 * padding
      : Math.min((2 * width) / 3, width - 280) - 2 * padding,
    boardAreaHeight:
      (portrait ? Math.min((3 * height) / 4, height - 200) : height) -
      2 * PLAYER_ROW_HEIGHT -
      2 * padding,
    shape,
    backboard,
  });

  return (
    <StyledContainer style={{ flexDirection: portrait ? "column" : "row", padding }}>
      <View
        style={[portrait ? { width: "100%" } : { flex: 2 }, { alignItems: "center" }]}
      >
        <View>
          <PlayerRow
            player={flipBoard ? PlayerName.White : PlayerName.Black}
            style={{ height: PLAYER_ROW_HEIGHT }}
          />
          <Board
            measurements={boardMeasurements}
            backboard={backboard}
            flipBoard={flipBoard}
          />
          <PlayerRow
            player={flipBoard ? PlayerName.Black : PlayerName.White}
            style={{ height: PLAYER_ROW_HEIGHT }}
          />
        </View>
        {gameMaster?.gameOver && !winModalHidden ? (
          <AbsoluteView>
            <WinModal onClose={hideWinModal} />
          </AbsoluteView>
        ) : moveDisambiguationRequired ? (
          <AbsoluteView style={{ justifyContent: "center", flexDirection: "row" }}>
            <MoveDisambiguationModal />
          </AbsoluteView>
        ) : null}
      </View>
      <SidebarContainer portrait={portrait} boardMeasurements={boardMeasurements}>
        <Sidebar style={{ flex: 1 }} />
      </SidebarContainer>
      <HelpMenu context={{ gameMaster }} />
    </StyledContainer>
  );
};

const StyledContainer = styled(ScreenContainer)`
  justify-content: space-around;
  align-items: center;
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
  min-width: 280px;
  max-width: 450px;
  padding: ${Platform.OS === "web" ? 0 : 8}px;
  margin-left: ${({ portrait }): number => (portrait ? 0 : 16)}px;
`;
