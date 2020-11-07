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

const Board: SFC<OuterBoardProps> = ({ style, maxSize, ...props }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const constrainedDimensions = maxSize
    ? {
        width: Math.min(dimensions.width, maxSize),
        height: Math.min(dimensions.height, maxSize),
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
  const { flipBoard } = useFlipDelay(gameMaster?.game?.currentPlayer);
  const shapeToken = gameMaster?.game.board.firstTokenWithName(TokenName.Shape);
  const loading =
    !gameMaster || (gameMaster.online && !gameMaster.roomId) || !dimensions.width;

  return (
    <View style={style}>
      <Timer
        player={flipBoard ? Player.White : Player.Black}
        style={{ margin: 12 }}
        hidden={loading}
      />
      <SizeContainer
        onLayout={handleDimensions}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {loading ? (
          <Spinner />
        ) : shapeToken?.data?.shape === SquareShape.Hex ? (
          <HexBoard {...props} dimensions={constrainedDimensions} flipBoard={flipBoard} />
        ) : (
          <SquareBoard
            {...props}
            dimensions={constrainedDimensions}
            flipBoard={flipBoard}
          />
        )}
      </SizeContainer>
      <Timer
        player={flipBoard ? Player.Black : Player.White}
        style={{ margin: 12 }}
        hidden={loading}
      />
    </View>
  );
};

const SizeContainer = styled(View)`
  flex: 1;
  align-self: stretch;
  align-items: center;
`;

export { Board, InnerBoardProps };
