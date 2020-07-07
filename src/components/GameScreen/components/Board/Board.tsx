import React, { FC, useContext } from "react";
import styled from "styled-components";
import { Square } from "./components";
import { GameContext } from "domain/gameState";
import { PopUp } from "domain/elements/PopUp";
import {View} from "react-native";

interface Props {
  maxWidth: number;
  maxHeight: number;
}

const boardDetails = {
  width: 8,
  height: 8,
};

const Board: FC<Props> = (props) => {
  const padding = 16;

  const squareSize = Math.min(
    (props.maxWidth - 2 * padding) / boardDetails.width,
    (props.maxHeight - 2 * padding) / boardDetails.height,
    100
  );

  const { gameState } = useContext(GameContext);

  return (
    <BoardContainer
      style={{
        height: squareSize * boardDetails.height,
        width: squareSize * boardDetails.width,
        padding,
      }}
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
      {gameState.popUp && (
        <PopUp popUp={gameState.popUp?.component} meta={gameState.popUp.meta} />
      )}
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
  background: green;
  display: flex;
  height: 100%;
  box-sizing: border-box;
`;

const ColumnContainer = styled(View)`
  flex-direction: column-reverse;
  justify-content: flex-end;
  flex: 1;
  display: flex;
`;

export { Board };
