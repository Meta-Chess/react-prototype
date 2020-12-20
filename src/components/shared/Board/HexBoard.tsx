import React, { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { objectMatches, range } from "utilities";
import { GameContext } from "game";
import { TokenName, SquareShape } from "game/types";
import { Square } from "./Square";
import { BoardProps } from "components/shared/Board/Board";
import { Styles } from "primitives/Styles";
import { BoardMeasurements } from "components/shared";
import { HexBackboard } from "./HexBackboard";

const HexBoard: SFC<BoardProps> = ({
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

  const boardPadding = 4 * measurements.boardPaddingHorizontal;
  const boardWidth = measurements.squareSize * measurements.width + boardPadding;
  const boardHeight = measurements.squareSize * measurements.height + boardPadding;

  return (
    <BoardContainer style={style} backboard={backboard} measurements={measurements}>
      <BackboardShadow
        style={{ alignSelf: "center" }}
        color={backboard ? Colors.BLACK.fade(0.5).toString() : "transparent"}
        padding={measurements.boardPaddingHorizontal}
        boardWidth={boardWidth + 4}
        boardHeight={boardHeight + 4}
      />
      <Backboard
        style={{ alignSelf: "center" }}
        color={backboard ? Colors.DARK.toString() : "transparent"}
        padding={measurements.boardPaddingHorizontal}
        boardWidth={boardWidth}
        boardHeight={boardHeight}
      />
      <CenteredContainer>
        {/*TODO: Can this layer be removed?*/}
        <SquaresContainer
          style={{
            flexDirection: flipBoard ? "row-reverse" : "row",
          }}
        >
          {fileCoordinates.map((file) => (
            <ColumnContainer
              style={{
                maxWidth: measurements.squareSize,
                flexDirection: flipBoard ? "column" : "column-reverse",
              }}
              key={file}
            >
              {rankCoordinates.map((rank) => {
                const square = game.board.firstSquareSatisfyingRule(
                  (square) =>
                    objectMatches({
                      rank,
                      file,
                    })(square.coordinates) &&
                    !square.hasTokenWithName(TokenName.InvisibilityToken)
                );
                // TODO: Handle hidden squares in hex better - maybe a rule to determine which coordinates belong on a hex grid?
                return (
                  <Square
                    size={square ? measurements.squareSize : measurements.spacings[0]}
                    square={square}
                    shape={SquareShape.Hex}
                    key={JSON.stringify([rank, file])}
                  />
                );
              })}
            </ColumnContainer>
          ))}
        </SquaresContainer>
      </CenteredContainer>
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

const CenteredContainer = styled(View)`
  align-self: center;
`;

const Backboard = styled(HexBackboard)`
  align-self: center;
`;

const BackboardShadow = styled(HexBackboard)`
  align-self: center;
`;

const SquaresContainer = styled(View)`
  display: flex;
  height: 100%;
  align-items: center;
`;

const ColumnContainer = styled(View)`
  flex-direction: column-reverse;
  justify-content: flex-end;
  flex: 1;
  display: flex;
`;

export { HexBoard };
