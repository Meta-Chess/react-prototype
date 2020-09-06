import { Rule } from "./types";
import { Pather } from "../Pather";
import { Board } from "../Board";
import { Move } from "../types";
import { applyInSequence } from "utilities";
import { cloneDeep } from "lodash";

export const Check: Rule = {
  inCanStayFilter: ({ move, board, rules, patherParams, filtered }) => {
    const newPatherParams = cloneDeep(patherParams);
    if (newPatherParams.checkDepth === undefined) {
      newPatherParams.checkDepth = 1;
    }

    if (newPatherParams.checkDepth > 0) {
      newPatherParams.checkDepth -= 1;
      const newBoard = doMove(board.clone(), rules, move); // should call game.doMove but requires refactor
      const pieces = newBoard.piecesNotBelongingTo(move.player);

      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const pather = new Pather(newBoard, piece, rules, newPatherParams);
        const hypotheticalMoves = pather.findPaths();
        for (let j = 0; j < hypotheticalMoves.length; j++) {
          const { dead } = applyInSequence(
            rules?.map((r) => r.lethalCondition),
            {
              board: doMove(newBoard.clone(), rules, hypotheticalMoves[j]),
              player: move.player,
              dead: false,
            }
          );
          if (dead) {
            return { move, board, rules, patherParams, filtered: true };
          }
        }
      }
      return { move, board, rules, patherParams, filtered };
    } else {
      return { move, board, rules, patherParams, filtered };
    }
  },
};

// PURGE
function doMove(board: Board, rules: Rule[], move: Move): Board {
  board.displacePieces(move.pieceDeltas);

  rules.forEach((v) => {
    v.postMove?.({ move });
  });

  return board;
}
