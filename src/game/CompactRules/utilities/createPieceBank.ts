import { LocationPrefix, Square } from "game/Board";
import { Game } from "game/Game";
import { invisibilityToken } from "../constants";

export function createPieceBank(game: Game): void {
  game.board.addSquares(
    game.players.map((player) => {
      const location = LocationPrefix.pieceBank + player.name.toString();
      return {
        location: location,
        square: new Square(
          location,
          { rank: 1000 + player.name, file: 1000 + player.name },
          [],
          [invisibilityToken]
        ),
      };
    })
  );
}
