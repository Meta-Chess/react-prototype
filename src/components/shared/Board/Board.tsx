import React, { useContext, useState } from "react";
import { Platform, View } from "react-native";
import styled from "styled-components/native";
import { SFC } from "primitives";
import { GameContext } from "game";
import { TokenName, SquareShape, Player } from "game/types";
import { HexBoard } from "./HexBoard";
import { SquareBoard } from "./SquareBoard";
import { useFlipDelay } from "./useFlipDelay";
import { Timer } from "./Timer";

interface OuterBoardProps {
  backboard?: boolean;
}

type InnerBoardProps = OuterBoardProps & {
  dimensions: { width: number; height: number };
  flipBoard: boolean;
};

const Board: SFC<OuterBoardProps> = ({ style, ...props }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { gameMaster } = useContext(GameContext);
  const { flipBoard } = useFlipDelay(gameMaster?.game?.currentPlayer); // TODO: Lift flip board above portrait decision, so the board doesn't briefly flip when the window resizes
  if (!gameMaster) return null;
  const shapeToken = gameMaster.game.board.firstTokenWithName(TokenName.Shape);

  return (
    <SizeContainer
      onLayout={(event): void => {
        const { width, height } = event.nativeEvent.layout;
        if (dimensions.width !== width || dimensions.height - 120 !== height)
          setDimensions({ width, height: height - 120 });
      }}
      style={[style, { margin: Platform.OS === "web" ? 12 : 0 }]}
    >
      <Timer
        player={flipBoard ? Player.White : Player.Black}
        style={{ marginBottom: 12 }}
      />
      {shapeToken?.data?.shape === SquareShape.Hex ? (
        <HexBoard {...props} dimensions={dimensions} flipBoard={flipBoard} />
      ) : (
        <SquareBoard {...props} dimensions={dimensions} flipBoard={flipBoard} />
      )}
      <Timer player={flipBoard ? Player.Black : Player.White} style={{ marginTop: 12 }} />
    </SizeContainer>
  );
};

const SizeContainer = styled(View)`
  flex: 1;
  align-self: stretch;
  align-items: center;
`;

export { Board, InnerBoardProps };
