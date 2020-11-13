import React, { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { objectMatches } from "utilities";
import { GameContext } from "game";
import { TokenName, SquareShape } from "game/types";
import { Square } from "./Square";
import { InnerBoardProps } from "components/shared/Board/Board";

const HexBoard: SFC<InnerBoardProps> = ({
  style,
  backboard = true,
  dimensions,
  flipBoard,
}) => {
  const padding = backboard ? 8 : 0;

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
    height: (Math.ceil(numberOfRanks / 2) * 2) / Math.sqrt(3),
  };

  const fileCoordinates = Array.from(Array(numberOfFiles).keys()).map((n) => n + minFile);
  const rankCoordinates = Array.from(Array(numberOfRanks).keys()).map((n) => n + minRank);

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
          backgroundColor: backboard ? Colors.DARK.toString() : "transparent",
          paddingVertical: padding,
          paddingHorizontal: 2 * padding,
        },
      ]}
    >
      {/*TODO: Can this layer be removed?*/}
      <SquaresContainer
        style={{
          flexDirection: flipBoard ? "row-reverse" : "row",
        }}
      >
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
                shape={SquareShape.Hex}
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
  box-shadow: 0px 1px 8px ${Colors.BLACK.fade(0.5).string()};
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
