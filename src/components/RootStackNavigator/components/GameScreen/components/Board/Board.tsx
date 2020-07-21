import React, { useContext } from "react";
import { SFC } from "primitives";
import styled from "styled-components/native";
import { Square } from "./components";
import { GameContext } from "domain/State";
import { View } from "react-native";

interface Props {
  maxWidth: number;
  maxHeight: number;
}

const Board: SFC<Props> = ({ style, maxWidth, maxHeight }) => {
  const padding = 8;
  const { gameState } = useContext(GameContext);

  const squares = Object.values(gameState.board.squares);

  const minRank = Math.min(...squares.map((s) => s.coordinates.rank));
  const maxRank = Math.max(...squares.map((s) => s.coordinates.rank));
  const minFile = Math.min(...squares.map((s) => s.coordinates.file));
  const maxFile = Math.max(...squares.map((s) => s.coordinates.file));
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
    (maxWidth - 2 * padding) / boardDetails.width,
    (maxHeight - 2 * padding) / boardDetails.height,
    100
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
      <SquaresContainer>
        {fileCoordinates.map((file) => (
          <ColumnContainer style={{ maxWidth: squareSize }} key={file}>
            {rankCoordinates.map((rank) => (
              <Square
                size={squareSize}
                squares={gameState.board.squaresWithRankAndFile({ rank, file })}
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
  background: #88888c;
  box-shadow: 2px 1px 16px #151515;
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

export { Board };
