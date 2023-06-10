import React, { FC, useState, useCallback, useContext } from "react";
import { Board, calculateBoardMeasurements } from "components/shared/Board";
import { Colors } from "primitives";
import { AbsoluteView } from "ui";
import styled from "styled-components/native";
import { TokenName } from "game";
import { GameContext } from "components/shared";

const ShadowBoard: FC<{ shadowFade?: number }> = ({ shadowFade = 0.15 }) => {
  const { gameMaster } = useContext(GameContext);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const handleDimensions = useCallback(
    (event) => {
      const { width, height } = event.nativeEvent.layout;
      if (dimensions.width !== width || dimensions.height !== height)
        setDimensions({ width, height: height });
    },
    [dimensions, setDimensions]
  );

  if (!gameMaster) return null;
  const shape = gameMaster.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape;

  const boardMeasurements = calculateBoardMeasurements({
    board: gameMaster.game.board,
    boardAreaWidth: Math.min(dimensions.width - 5, 800), // TODO: fix needing -5 so hex doesnt overflow the coverview
    boardAreaHeight: Math.min(dimensions.height - 5, 800),
    shape,
    backboard: false,
  });

  return (
    <Container onLayout={handleDimensions}>
      <Board measurements={boardMeasurements} backboard={false} />
      <ShadowLayer shadowFade={shadowFade} />
    </Container>
  );
};

const Container = styled(AbsoluteView)`
  align-items: center;
  justify-content: center;
`;

const ShadowLayer = styled(AbsoluteView)<{ shadowFade: number }>`
  background-color: ${({ shadowFade }): string =>
    Colors.DARKEST.fade(shadowFade).toString()}};
`;

export { ShadowBoard };
