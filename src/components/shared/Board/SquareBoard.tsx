import React, { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { objectMatches, range } from "utilities";
import { GameContext } from "game";
import { TokenName } from "game/types";
import { Square } from "./Square";
import { BoardProps } from "components/shared/Board/Board";
import { Styles } from "primitives/Styles";
import { BoardMeasurements } from "components/shared";

const SquareBoard: SFC<BoardProps> = ({
  style,
  backboard = true,
  measurements,
  flipBoard,
}) => {
  const { gameMaster } = useContext(GameContext);
  const game = gameMaster?.game;
  if (!game) return null;

  const { minRank, maxRank, minFile, maxFile } = measurements.rankAndFileBounds;
  const fileCoordinates = range(minFile, maxFile - minFile + 1);
  const rankCoordinates = range(minRank, maxRank - minFile + 1);

  return (
    <BoardContainer style={style} measurements={measurements} backboard={backboard}>
      <SquaresContainer style={{ flexDirection: flipBoard ? "row-reverse" : "row" }}>
        {fileCoordinates.map((file) => (
          <ColumnContainer
            style={{
              maxWidth: measurements.squareSize,
              flexDirection: flipBoard ? "column" : "column-reverse",
            }}
            key={file}
          >
            {rankCoordinates.map((rank) => (
              <Square
                size={measurements.squareSize}
                square={game.board.firstSquareSatisfyingRule(
                  (square) =>
                    objectMatches({
                      rank,
                      file,
                    })(square.coordinates) &&
                    !square.hasTokenWithName(TokenName.InvisibilityToken)
                )}
                key={JSON.stringify([rank, file])}
              />
            ))}
          </ColumnContainer>
        ))}
      </SquaresContainer>
    </BoardContainer>
  );
};

const BoardContainer = styled(View)<{
  backboard: boolean;
  measurements: BoardMeasurements;
}>`
  position: relative;
  ${({ backboard }): string => (backboard ? Styles.BOX_SHADOW_STRONG : "")}
  ${({ backboard }): string =>
    backboard ? `background-color: ${Colors.DARK.toString()}` : ""}
  height: ${({ measurements }): number => measurements.height}px;
  width: ${({ measurements }): number => measurements.width}px;
  padding-horizontal: ${({ measurements }): number =>
    measurements.boardPaddingHorizontal}px;
  padding-vertical: ${({ measurements }): number => measurements.boardPaddingVertical}px;
`;

const SquaresContainer = styled(View)`
  flex-direction: row;
  display: flex;
  height: 100%;
`;

const ColumnContainer = styled(View)`
  justify-content: flex-end;
  flex: 1;
  display: flex;
`;

export { SquareBoard };
