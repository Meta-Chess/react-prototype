import { CompactRules, Rule } from "./Rules";
import { Pather } from "../Pather";
import { Board } from "../Board";
import { Move } from "../types";
import { applyInSequence } from "utilities";
import { cloneDeep } from "lodash";

export const Check: Rule = {
  inCanStayFilter: ({ move, board, interrupt, patherParams, filtered }) => {
    const newPatherParams = cloneDeep(patherParams);
    if (newPatherParams.checkDepth === undefined) {
      newPatherParams.checkDepth = 1;
    }

    if (newPatherParams.checkDepth > 0) {
      newPatherParams.checkDepth -= 1;
      const newBoard = doMove(board.clone(), interrupt, move); // should call game.doMove but requires refactor
      const pieces = newBoard.piecesNotBelongingTo(move.player);

      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const pather = new Pather(newBoard, piece, interrupt, newPatherParams);
        const hypotheticalMoves = pather.findPaths();
        for (let j = 0; j < hypotheticalMoves.length; j++) {
          const { dead } = interrupt.for.lethalCondition({
            board: doMove(newBoard.clone(), interrupt, hypotheticalMoves[j]),
            player: move.player,
            dead: false,
          });
          if (dead) {
            return { move, board, interrupt, patherParams, filtered: true };
          }
        }
      }
      return { move, board, interrupt, patherParams, filtered };
    } else {
      return { move, board, interrupt, patherParams, filtered };
    }
  },
};

// PURGE
function doMove(board: Board, interrupt: CompactRules, move: Move): Board {
  board.displacePieces(move.pieceDeltas);
  interrupt.for.postMove({ move });
  return board;
}
