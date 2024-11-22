import autoBind from "auto-bind";
import { randomChoice } from "utilities";
import { GameMaster } from "game/GameMaster";
import { Move } from "game/Move";
import { Pather } from "game/Pather";
import { Player } from "game/Player";
import { AutomaticPlayer } from "./AutomaticPlayer";

export class RandomMovePlayer implements AutomaticPlayer {
  constructor(private gameMaster: GameMaster, private player: Player) {
    autoBind(this);
  }

  getNextMove(): Move {
    const pieces = this.gameMaster.game.board.piecesBelongingTo(this.player.name);
    const moves: Move[] = pieces.flatMap((pieceToMove) =>
      new Pather(
        this.gameMaster.game,
        this.gameMaster.gameClones,
        pieceToMove,
        this.gameMaster.interrupt
      ).findPaths()
    );
    return randomChoice(moves);
  }
}
