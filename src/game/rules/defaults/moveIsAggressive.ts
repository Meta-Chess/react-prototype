import { Board, Move } from "game";

interface Data {
  board: Board;
  move: Move;
  aggressive: boolean;
}

export function moveIsAggressive({ board, move, aggressive }: Data): Data {
  const square = board.squareAt(move.location);
  return {
    board,
    move,
    aggressive:
      aggressive ||
      (!!square && board.squareHasPieceNotBelongingTo(square, move.playerName)),
  };
}
