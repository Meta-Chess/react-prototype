import React, { useContext } from "react";
import { Platform, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { objectMatches } from "utilities";
import { GameContext } from "game";
import { TokenName } from "game/types";
import { Square } from "./Square";
import { InnerBoardProps } from "components/shared/Board/Board";
import { Styles } from "primitives/Styles";

const SquareBoard: SFC<InnerBoardProps> = ({
  style,
  backboard = true,
  dimensions,
  flipBoard,
}) => {
  const padding = backboard && Platform.OS === "web" ? 8 : 0;

  const { gameMaster } = useContext(GameContext);
  const game = gameMaster?.game;
  if (!game) return null;

  const { minRank, maxRank, minFile, maxFile } = game.board.rankAndFileBoundsWithFilter(
    (square) => !square.hasTokenWithName(TokenName.InvisibilityToken)
  );

  const numberOfRanks = maxRank - minRank + 1;
  const numberOfFiles = maxFile - minFile + 1;

  const boardDetails = {
    width: numberOfFiles,
    height: numberOfRanks,
  };

  const fileCoordinates = Array.from(Array(boardDetails.width).keys()).map(
    (n) => n + minFile
  );
  const rankCoordinates = Array.from(Array(boardDetails.height).keys()).map(
    (n) => n + minRank
  );

  const squareSize = Math.min(
    (dimensions.width - 2 * padding) / boardDetails.width,
    (dimensions.height - 2 * padding) / boardDetails.height,
    120
  );

  return (
    <BoardContainer
      style={[
        style,
        {
          height: squareSize * boardDetails.height + 2 * padding,
          width: squareSize * boardDetails.width + 2 * padding,
          padding,
        },
      ]}
    >
      <SquaresContainer style={{ flexDirection: flipBoard ? "row-reverse" : "row" }}>
        {fileCoordinates.map((file) => (
          <ColumnContainer
            style={{
              maxWidth: squareSize,
              flexDirection: flipBoard ? "column" : "column-reverse",
            }}
            key={file}
          >
            {rankCoordinates.map((rank) => (
              <Square
                size={squareSize}
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

const BoardContainer = styled(View)`
  position: relative;
  background: ${Colors.DARK.string()};
  ${Styles.BOX_SHADOW_STRONG}
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
