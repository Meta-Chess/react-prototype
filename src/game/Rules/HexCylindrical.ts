import { Adjacency, Square } from "../Board";
import { Direction, RankAndFileBounds, Rule } from "game/types";
import { range } from "utilities";
import { invisibilityToken } from "./constants";

export const HexCylindrical: Rule = {
  onBoardCreatedModify: ({ board }) => {
    const bounds = board.rankAndFileBounds();
    board.addSquares(generateEdgeStitchingSquares());
    board.addAdjacenciesByRule(cylindricalAdjacenciesRule(bounds));
    return { board };
  },
};

const generateEdgeStitchingSquares = (): { location: string; square: Square }[] =>
  range(5, 7, 2).map((r) => {
    const location = `ER${r}F0`;
    return {
      location,
      square: new Square(location, { rank: r, file: 0 }, [invisibilityToken]),
    };
  });

const cylindricalAdjacenciesRule = ({ minFile, maxFile }: RankAndFileBounds) => (
  square: Square
): Adjacency[] => {
  const { rank, file } = square.getCoordinates();
  return file === minFile
    ? [
        { direction: Direction.H7, location: `ER${rank - 3}F0` },
        { direction: Direction.H8, location: `ER${rank - 1}F0` },
        { direction: Direction.H9, location: `R${rank}F${maxFile}` },
        { direction: Direction.H10, location: `ER${rank + 1}F0` },
        { direction: Direction.H11, location: `ER${rank + 3}F0` },
      ]
    : file === minFile + 1
    ? [{ direction: Direction.H9, location: `ER${rank}F0` }]
    : file === maxFile
    ? [
        { direction: Direction.H1, location: `ER${rank + 3}F0` },
        { direction: Direction.H2, location: `ER${rank + 1}F0` },
        { direction: Direction.H3, location: `R${rank}F${minFile}` },
        { direction: Direction.H4, location: `ER${rank - 1}F0` },
        { direction: Direction.H5, location: `ER${rank - 3}F0` },
      ]
    : file === maxFile - 1
    ? [{ direction: Direction.H3, location: `ER${rank}F0` }]
    : file === 0 && square.getLocation().charAt(0) === "E"
    ? [
        { direction: Direction.H1, location: `R${rank + 3}F${1}` },
        { direction: Direction.H2, location: `R${rank + 1}F${1}` },
        { direction: Direction.H3, location: `R${rank}F${2}` },
        { direction: Direction.H4, location: `R${rank - 1}F${1}` },
        { direction: Direction.H5, location: `R${rank - 3}F${1}` },
        { direction: Direction.H6, location: `ER${rank - 2}F0` },
        { direction: Direction.H7, location: `R${rank - 3}F${maxFile}` },
        { direction: Direction.H8, location: `R${rank - 1}F${maxFile}` },
        { direction: Direction.H9, location: `R${rank}F${maxFile - 1}` },
        { direction: Direction.H10, location: `R${rank + 1}F${maxFile}` },
        { direction: Direction.H11, location: `R${rank + 3}F${maxFile}` },
        { direction: Direction.H12, location: `ER${rank + 2}F0` },
      ]
    : [];
};
