import React, { useContext, useState } from "react";
import { Platform, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { objectMatches } from "utilities";
import { GameContext } from "game";
import { TokenName } from "game/types";
import { Square } from "./Square";

const SquareBoard: SFC = ({ style }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const padding = Platform.OS === "web" ? 8 : 0;
  const { game } = useContext(GameContext);
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
    <SizeContainer
      onLayout={(event): void => {
        const { width, height } = event.nativeEvent.layout;
        if (dimensions.width !== width || dimensions.height !== height)
          setDimensions({ width, height });
      }}
      style={style}
    >
      <BoardContainer
        style={[
          {
            height: squareSize * boardDetails.height + 2 * padding,
            width: squareSize * boardDetails.width + 2 * padding,
            padding,
          },
        ]}
      >
        <SquaresContainer>
          {fileCoordinates.map((file) => (
            <ColumnContainer style={{ maxWidth: squareSize }} key={file}>
              {rankCoordinates.map((rank) => (
                <Square
                  size={squareSize}
                  squares={game.board.squaresByCondition((square) =>
                    objectMatches({
                      rank,
                      file,
                    })(square.coordinates)
                  )}
                  key={JSON.stringify([rank, file])}
                />
              ))}
            </ColumnContainer>
          ))}
        </SquaresContainer>
      </BoardContainer>
    </SizeContainer>
  );
};

const SizeContainer = styled(View)`
  flex: 1;
  align-self: stretch;
  align-items: center;
`;

const BoardContainer = styled(View)`
  position: relative;
  background: ${Colors.DARK.string()};
  box-shadow: 2px 1px 8px ${Colors.SHADOW.fade(0.8).string()};
`;

const SquaresContainer = styled(View)`
  flex-direction: row;
  display: flex;
  height: 100%;
`;

const ColumnContainer = styled(View)`
  flex-direction: column-reverse;
  justify-content: flex-end;
  flex: 1;
  display: flex;
`;

export { SquareBoard };
