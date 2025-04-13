import autoBind from "auto-bind";
import { randomChoice } from "utilities";
import { GameMaster } from "game/GameMaster";
import { Move } from "game/Move";
import { Pather } from "game/Pather";
import { Player } from "game/Player";
import { PlayerAction } from "game/PlayerAction";
import { AutomaticPlayer } from "./AutomaticPlayer";
import { PlayerAgent } from "./PlayerAgent";

export class RandomMovePlayer extends PlayerAgent implements AutomaticPlayer {
  constructor(protected gameMaster: GameMaster, protected player: Player) {
    super(gameMaster, player);
    autoBind(this);
  }

  protected comeUpWithPlayerAction(): PlayerAction {
    return { type: "move", data: this.getNextMove() };
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
