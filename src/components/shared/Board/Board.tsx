import React, { useCallback, useContext, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC } from "primitives";
import { GameContext } from "game";
import { TokenName, SquareShape, Player } from "game/types";
import { HexBoard } from "./HexBoard";
import { SquareBoard } from "./SquareBoard";
import { useFlipDelay } from "./useFlipDelay";
import { Timer } from "./Timer";
import { Spinner } from "ui";

interface OuterBoardProps {
  backboard?: boolean;
  maxSize?: number;
}

interface InnerBoardProps {
  backboard?: boolean;
  dimensions: { width: number; height: number };
  flipBoard: boolean;
}

const Board: SFC<OuterBoardProps> = ({ style, ...props }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const constrainedDimensions = props.maxSize
    ? {
        width: Math.min(dimensions.width, props.maxSize),
        height: Math.min(dimensions.height, props.maxSize),
      }
    : dimensions;

  const handleDimensions = useCallback(
    (event) => {
      const { width, height } = event.nativeEvent.layout;
      if (dimensions.width !== width || dimensions.height !== height)
        setDimensions({ width, height: height });
    },
    [dimensions, setDimensions]
  );

  const { gameMaster } = useContext(GameContext);
  const { flipBoard } = useFlipDelay(gameMaster?.game?.currentPlayer); // TODO: Lift flip board above portrait decision, so the board doesn't briefly flip when the window resizes

  return (
    <SizeContainer onLayout={handleDimensions} style={[style]}>
      {!gameMaster || (gameMaster.online && !gameMaster.roomId) || !dimensions.width ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Spinner />
        </View>
      ) : (
        <>
          <Timer
            player={flipBoard ? Player.White : Player.Black}
            style={{ marginBottom: 12 }}
          />
          {gameMaster.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape ===
          SquareShape.Hex ? (
            <HexBoard
              {...props}
              dimensions={constrainedDimensions}
              flipBoard={flipBoard}
            />
          ) : (
            <SquareBoard
              {...props}
              dimensions={constrainedDimensions}
              flipBoard={flipBoard}
            />
          )}
          <Timer
            player={flipBoard ? Player.Black : Player.White}
            style={{ marginTop: 12 }}
          />
        </>
      )}
    </SizeContainer>
  );
};

const SizeContainer = styled(View)`
  flex: 1;
  align-self: stretch;
  align-items: center;
`;

export { Board, InnerBoardProps };
