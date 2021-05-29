import { Piece } from "game";
import { Rule, ParameterRule, PostMove } from "../CompactRules";
import { getDefaultParams, createPieceMutator, mutatePiece } from "../utilities";

export const royallyScrewed: ParameterRule = (
  ruleParams = getDefaultParams("royallyScrewedSettings")
): Rule => {
  return {
    title: "Royally Screwed",
    description: "After every move, friendly kings and queens swap places.",

    postMove: ({ game, interrupt, board, move, currentTurn }): PostMove => {
      const piecesToChange = board.getPiecesByRule((piece: Piece) => {
        const playerName = move?.playerName || game.getCurrentPlayerName();
        return (
          piece.owner === playerName &&
          (ruleParams["Piece Cycles"] || []).flat().includes(piece.name)
        );
      });
      piecesToChange.forEach((piece) => {
        const newPieceName = createPieceMutator(ruleParams["Piece Cycles"] || [])[
          piece.name
        ];
        mutatePiece(piece, newPieceName, board);
      });
      return { game, interrupt, board, move, currentTurn };
    },
  };
};
