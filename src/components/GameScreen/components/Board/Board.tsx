import React, { useContext } from "react";
import { SFC } from "primitives";
import styled from "styled-components/native";
import { Square } from "./components";
import { GameContext } from "domain/gameState";
import { View } from "react-native";

interface Props {
  maxWidth: number;
  maxHeight: number;
}

const boardDetails = {
  width: 8,
  height: 8,
};

const Board: SFC<Props> = ({ style, maxWidth, maxHeight }) => {
  const padding = 16;

  const squareSize = Math.min(
    (maxWidth - 2 * padding) / boardDetails.width,
    (maxHeight - 2 * padding) / boardDetails.height,
    100
  );

  const { gameState } = useContext(GameContext);

  return (
    <BoardContainer
      style={[
        style,
        {
          height: squareSize * boardDetails.height,
          width: squareSize * boardDetails.width,
          padding,
        },
      ]}
    >
      <SquaresContainer>
        {coordinateRow.map((x) => (
          <ColumnContainer style={{ maxWidth: squareSize }} key={x}>
            {coordinateCol.map((y) => (
              <Square
                size={squareSize}
                location={{ x, y }}
                key={JSON.stringify([x, y])}
              />
            ))}
          </ColumnContainer>
        ))}
      </SquaresContainer>
    </BoardContainer>
  );
};

const coordinateRow = Array.from(Array(boardDetails.width).keys());
const coordinateCol = Array.from(Array(boardDetails.height).keys());

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
