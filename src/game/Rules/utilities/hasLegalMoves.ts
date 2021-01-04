import { CompactRules } from "../..";
import { Game } from "../..";
import { PlayerName } from "../../types";
import { Pather } from "../../Pather";

export function hasLegalMoves(
  playerName: PlayerName,
  game: Game,
  gameClones: Game[],
  interrupt: CompactRules
): boolean {
  const player = game.players.filter((p) => p.name === playerName)[0];
  const hasLegalMoves = player.hasLegalMoves;
  if (hasLegalMoves === undefined) {
    const pieces = game.board.piecesBelongingTo(playerName);
    for (let i = 0; i < pieces.length; i++) {
      const pather = new Pather(game, gameClones, pieces[i], interrupt);
      const hypotheticalMoves = pather.findPaths();
      if (hypotheticalMoves.length > 0) {
        player.hasLegalMoves = true;
        return true;
      }
    }
    return false;
  } else if (hasLegalMoves) {
    player.hasLegalMoves = true;
    return true;
  } else {
    player.hasLegalMoves = false;
    return false;
  }
}
