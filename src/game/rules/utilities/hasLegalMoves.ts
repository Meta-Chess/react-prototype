import { CompactRules } from "game/rules";
import { Game } from "game/Game";
import { PlayerName } from "game/types";
import { Pather } from "game/Pather";

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
  } else {
    return hasLegalMoves.value;
  }
}
