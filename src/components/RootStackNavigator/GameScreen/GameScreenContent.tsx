import React, { FC, useCallback, useContext, useMemo, useState } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import {
  Board,
  BoardMeasurements,
  BoardViewContext,
  calculateBoardMeasurements,
  GameContext,
  HelpMenu,
  ScreenContainer,
} from "components/shared";
import { Sidebar } from "./Sidebar";
import { SquareShape, TokenName } from "game";
import { useFlipBoard } from "./useFlipBoard";
import { AbsoluteView, Spinner } from "ui";
import styled from "styled-components/native";
import { WinModal } from "./WinModal";
import { MoveDisambiguationModal } from "./MoveDisambiguationModal";
import { getPromotionDisambiguationOpportunities } from "./getPromotionDisambiguationOpportunities";
import { PromotionDisambiguationModal } from "./PromotionDisambiguationModal";
import { TrackingPixel } from "primitives";
import { ChangeViewsReminderModal } from "components/shared/Board/ChangeViewsReminderModal";

export const GameScreenContent: FC = () => {
  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  const { gameMaster } = useContext(GameContext);
  const [winModalHidden, setWinModalHidden] = useState(false);
  const hideWinModal = useCallback(() => setWinModalHidden(true), []);

  const isNimbusGame = useMemo(() => {
    const ruleNames = gameMaster?.getRuleNames() || [];
    return ruleNames.some((name) => name === "nimbus");
  }, [gameMaster?.getRuleNames()]);

  const allowableMoves = gameMaster?.allowableMoves;
  const moveDisambiguationRequired =
    gameMaster?.locationSelected && (allowableMoves?.length || 0) > 1;
  const promotionDisambiguationOpportunities = useMemo(
    () =>
      moveDisambiguationRequired
        ? getPromotionDisambiguationOpportunities(allowableMoves)
        : [],
    [moveDisambiguationRequired, allowableMoves, allowableMoves?.length]
  );

  const { possibleBoardVisualisations } = useContext(BoardViewContext);

  const { flipBoard } = useFlipBoard();
  const shape = gameMaster?.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape;

  if (!gameMaster)
    return (
      <StyledContainer>
        <Spinner />
      </StyledContainer>
    );

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
    <StyledContainer
      portraitFriendly={true}
      style={{ flexDirection: portrait ? "column" : "row", padding }}
    >
      <TrackingPixel urlEnd={"GameScreenContent"} />
      <Container portrait={portrait}>
        <SidebarContainer portrait={portrait} boardMeasurements={boardMeasurements}>
          <Sidebar
            style={[
              portrait ? { marginHorizontal: 4 } : { marginVertical: 4 },
              { flex: 1 },
            ]}
          />
        </SidebarContainer>
        <View>
          <Board
            measurements={boardMeasurements}
            {...{ backboard, flipBoard, possibleBoardVisualisations }}
          />
          {possibleBoardVisualisations.length > 1 && <ChangeViewsReminderModal />}
          {gameMaster?.gameOver && !winModalHidden ? (
            <AbsoluteView>
              <WinModal onClose={hideWinModal} />
            </AbsoluteView>
          ) : promotionDisambiguationOpportunities?.length > 0 ? (
            <AbsoluteView>
              <PromotionDisambiguationModal
                promotion={promotionDisambiguationOpportunities[0]}
                pieceSize={shape === SquareShape.Arc ? 60 : boardMeasurements.squareSize}
              />
            </AbsoluteView>
          ) : moveDisambiguationRequired ? (
            <AbsoluteView style={{ justifyContent: "center", flexDirection: "row" }}>
              <MoveDisambiguationModal flipBoard={flipBoard} />
            </AbsoluteView>
          ) : null}
        </View>
      </Container>
      <HelpMenu
        context={{ gameMaster }}
        aboutConfig={isNimbusGame ? ["nimbus", "mchess"] : undefined}
      />
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
  ${({ portrait }): string =>
    "flex-direction: " + (portrait ? "column-reverse" : "row-reverse") + ";"}
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
  padding: ${Platform.OS === "web" ? 0 : 8}px;
  margin-left: ${({ portrait }): number => (portrait ? 0 : 16)}px;
`;
