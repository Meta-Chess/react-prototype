import React, { useContext } from "react";
import { SFC } from "primitives";
import { GameContext } from "game";
import { TokenName, SquareShape } from "game/types";
import { HexBoard } from "./HexBoard";
import { SquareBoard } from "./SquareBoard";

interface BoardProps {
  backboard?: boolean;
}

const Board: SFC<BoardProps> = (props) => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;
  const shapeToken = gameMaster.game.board.firstTokenWithName(TokenName.Shape);

  if (shapeToken?.data?.shape === SquareShape.Hex) return <HexBoard {...props} />;
  return <SquareBoard {...props} />;
};

export { Board, BoardProps };
