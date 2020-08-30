import React, { useContext } from "react";
import { SFC } from "primitives";
import { GameContext } from "game";
import { TokenName, SquareShape } from "game/types";
import { HexBoard } from "./HexBoard";
import { SquareBoard } from "./SquareBoard";

const Board: SFC = ({ style }) => {
  const { game } = useContext(GameContext);
  if (!game) return null;
  const shapeToken = game.board.firstTokenWithName(TokenName.Shape);

  if (shapeToken?.data?.shape === SquareShape.Hex) return <HexBoard style={style} />;
  return <SquareBoard style={style} />;
};

export { Board };
