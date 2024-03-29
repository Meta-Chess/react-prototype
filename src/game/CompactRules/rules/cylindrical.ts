import { Adjacency, Board, Square } from "game/Board";
import { AfterBoardCreation, TrivialParameterRule } from "../CompactRules";
import { Direction, RankAndFileBounds } from "game/types";
import { toLocation } from "utilities";

export const cylindrical: TrivialParameterRule = () => ({
  title: "Cylinder",
  description:
    "The board has been wrapped onto a cylinder, and the edge files have been glued together. This allows pieces to move off the right side of the board onto the left side, and vice versa.",
  afterBoardCreation: ({ board }): AfterBoardCreation => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(cylindricalAdjacenciesRule(bounds, board));
    return { board };
  },
});

const cylindricalAdjacenciesRule =
  ({ minFile, maxFile }: RankAndFileBounds, board: Board) =>
  (square: Square): Adjacency[] => {
    const { rank, file } = square.getCoordinates();
    return file === minFile
      ? [
          { direction: Direction.W, location: toLocation({ rank, file: maxFile }) },
          ...(board
            ?.squareAt(toLocation({ rank, file: maxFile }))
            ?.go(Direction.N)
            ?.map((location) => ({ direction: Direction.NW, location })) || []),
          ...(board
            ?.squareAt(toLocation({ rank, file: maxFile }))
            ?.go(Direction.S)
            ?.map((location) => ({ direction: Direction.SW, location })) || []),
        ]
      : file === maxFile
      ? [
          { direction: Direction.E, location: toLocation({ rank, file: minFile }) },
          ...(board
            ?.squareAt(toLocation({ rank, file: minFile }))
            ?.go(Direction.N)
            ?.map((location) => ({ direction: Direction.NE, location })) || []),
          ...(board
            ?.squareAt(toLocation({ rank, file: minFile }))
            ?.go(Direction.S)
            ?.map((location) => ({ direction: Direction.SE, location })) || []),
        ]
      : [];
  };
