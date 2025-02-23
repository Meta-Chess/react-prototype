import { Piece } from "game";
import { ParameterRule, PostMove } from "../CompactRules";
import { createPieceMutator, mutatePiece } from "../utilities";

// TODO: this should be in the same place as promotion
export const royallyScrewed: ParameterRule<"royallyScrewed"> = ({
  "Piece Cycles": pieceCycleParam,
}) => ({
  title: "Royally Screwed",
  description: "After every move, friendly kings and queens swap places.",
  postMove: ({ game, interrupt, board, move, turnIndexes }): PostMove => {
    if (!pieceCycleParam) return { game, interrupt, board, move, turnIndexes };

    const piecesToChange = board.getPiecesByRule((piece: Piece) => {
      const playerName = move?.playerName || game.getCurrentPlayerName();
      return piece.owner === playerName && pieceCycleParam.flat().includes(piece.name);
    });

    piecesToChange.forEach((piece) => {
      const newPieceName = createPieceMutator(pieceCycleParam)[piece.name];
      mutatePiece(piece, newPieceName, board);
    });
    return { game, interrupt, board, move, turnIndexes };
  },
});
