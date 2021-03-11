import React, { FC, useContext, useCallback, useState, useMemo } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import { Board, BoardMeasurements, calculateBoardMeasurements } from "components/shared";
import { Sidebar } from "./Sidebar";
import { SquareShape, TokenName, GameContext } from "game";
import { useFlipBoard } from "./useFlipBoard";
import { AbsoluteView, Spinner } from "ui";
import styled from "styled-components/native";
import { HelpMenu, ScreenContainer } from "components/shared";
import { WinModal } from "./WinModal";
import { MoveDisambiguationModal } from "./MoveDisambiguationModal";
import { getPromotionDisambiguationOpportunities } from "./getPromotionDisambiguationOpportunities";
import { PromotionDisambiguationModal } from "./PromotionDisambiguationModal";
import { SquareBackboard } from "components/shared/Board/SquareBackboard";

export const GameScreenContent: FC = () => {
  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  const { gameMaster } = useContext(GameContext);
  const [winModalHidden, setWinModalHidden] = useState(false);
  const hideWinModal = useCallback(() => setWinModalHidden(true), []);
  const allowableMoves = gameMaster?.allowableMoves;
  const moveDisambiguationRequired =
    gameMaster?.locationSelected && (allowableMoves?.length || 0) > 1;
  const promotionDisambiguationOpportunities = useMemo(
    () =>
      moveDisambiguationRequired
        ? getPromotionDisambiguationOpportunities(allowableMoves)
        : [],
    [moveDisambiguationRequired, allowableMoves]
  );
  const { flipBoard } = useFlipBoard();
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
      (portrait ? Math.min((3 * height) / 4, height - 200) : height) - 2 * padding,
    shape,
    backboard,
  });

  return (
    <StyledContainer style={{ flexDirection: portrait ? "column" : "row", padding }}>
      <Container portrait={portrait}>
        <View>
          <Board
            measurements={boardMeasurements}
            backboard={backboard}
            flipBoard={flipBoard}
          />
          {gameMaster?.gameOver && !winModalHidden ? (
            <AbsoluteView>
              <WinModal onClose={hideWinModal} />
            </AbsoluteView>
          ) : promotionDisambiguationOpportunities?.length > 0 ? (
            <AbsoluteView>
              <PromotionDisambiguationModal
                promotion={promotionDisambiguationOpportunities[0]}
                pieceSize={boardMeasurements.squareSize}
              />
            </AbsoluteView>
          ) : moveDisambiguationRequired ? (
            <AbsoluteView style={{ justifyContent: "center", flexDirection: "row" }}>
              <MoveDisambiguationModal />
            </AbsoluteView>
          ) : null}
        </View>
        <SidebarContainer portrait={portrait} boardMeasurements={boardMeasurements}>
          <SquareBackboard />
          <Sidebar style={{ flex: 1 }} />
        </SidebarContainer>
      </Container>
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

const Container = styled(View)<{ portrait: boolean }>`
  ${({ portrait }): string => (portrait ? "width: 100%; height: 100%;" : "flex: 1;")}
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${({ portrait }): string => "flex-direction: " + (portrait ? "column" : "row") + ";"}
`;

const SidebarContainer = styled(View)<SidebarContainerProps>`
  flex: 1;
  ${({ portrait }): string => (portrait ? "margin-top: 24px;" : "")}
  ${({ portrait, boardMeasurements }): string =>
    portrait ? "" : `height: ${boardMeasurements.height}px;`}
  ${({ portrait, boardMeasurements }): string =>
    portrait ? `width: ${boardMeasurements.width}px;` : ""}
  min-width: 280px;
  max-width: 450px;
  padding: ${Platform.OS === "web" ? 8 : 8}px;
  margin-left: ${({ portrait }): number => (portrait ? 0 : 16)}px;
`;
