import React, { useContext, useState } from "react";
import { SFC } from "primitives";
import styled from "styled-components/native";
import { Square } from "./components";
import { GameContext } from "domain/Game";
import { View } from "react-native";

const Board: SFC = ({ style }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const padding = 8;
  const { game } = useContext(GameContext);

  const squares = Object.values(game.board.squares);

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
    (dimensions.width - 2 * padding) / boardDetails.width,
    (dimensions.height - 2 * padding) / boardDetails.height,
    100
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
                  squares={game.board.squaresWithRankAndFile({
                    rank,
                    file,
                  })}
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
  margin: 24px;
  align-items: center;
`;

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
