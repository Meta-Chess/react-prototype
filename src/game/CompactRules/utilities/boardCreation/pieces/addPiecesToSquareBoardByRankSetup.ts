import { RankSetup, PIECE_SYMBOL_INFO } from "../Setup";
import { createPiece } from "game/CompactRules/utilities";
import type { Board } from "game/Board";
import { keys, toLocation } from "utilities";

export function addPiecesToSquareBoardByRankSetup(board: Board, setup: RankSetup): void {
  keys(setup).map((rank) =>
    setup[rank].forEach((pieceSymbol, index) => {
      if (pieceSymbol in PIECE_SYMBOL_INFO) {
        const file = index + 1;
        const location = toLocation({ rank, file });
        const owner = PIECE_SYMBOL_INFO[pieceSymbol].owner;
        const name = PIECE_SYMBOL_INFO[pieceSymbol].name;
        const square = board.squareAt(location);
        const piece = createPiece({ location, owner, name });
        board.addPiece({ piece, square, location });
      }
    })
  );
}
