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
  if (hasLegalMoves.turn !== game.currentTurn) {
    const pieces = game.board.piecesBelongingTo(playerName);
    for (let i = 0; i < pieces.length; i++) {
      const pather = new Pather(game, gameClones, pieces[i], interrupt);
      const hypotheticalMoves = pather.findPaths();
      if (hypotheticalMoves.length > 0) {
        player.hasLegalMoves = { value: true, turn: game.currentTurn };
        return true;
      }
    }
    player.hasLegalMoves = { value: false, turn: game.currentTurn };
    return false;
  } else if (hasLegalMoves.value) {
    return true;
  } else {
    return false;
  }
}
