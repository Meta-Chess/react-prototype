import autoBind from "auto-bind";
import { maxBy } from "lodash";
import { isPresent } from "utilities";
import { GameMaster } from "game/GameMaster";
import { Move } from "game/Move";
import { Pather } from "game/Pather";
import { Player } from "game/Player";
import { PieceName } from "game/types";
import { PlayerAction } from "game/PlayerAction";
import { AutomaticPlayer } from "./AutomaticPlayer";
import { PlayerAgent } from "./PlayerAgent";

export class SlightlyImprovedRandomMovePlayer
  extends PlayerAgent
  implements AutomaticPlayer
{
  constructor(gameMaster: GameMaster, player: Player) {
    super(gameMaster, player);
    autoBind(this);
  }

  protected comeUpWithPlayerAction(): PlayerAction {
    return { type: "move", data: this.getNextMove() };
  }

  getNextMove(): Move | undefined {
    const pieces = this.gameMaster.game.board.piecesBelongingTo(this.player.name);
    const moves: Move[] = pieces.flatMap((pieceToMove) =>
      new Pather(
        this.gameMaster.game,
        this.gameMaster.gameClones,
        pieceToMove,
        this.gameMaster.interrupt
      ).findPaths()
    );

    return maxBy(moves, (move) => {
      const captureValue =
        move.captures
          ?.flatMap((capture) => capture.pieceIds)
          .map((pieceId) => this.gameMaster.game.board.getPiece(pieceId))
          .filter(isPresent)
          .map(
            // TODO: Check if this is accounting for self-capture in atomic correctly
            (piece) =>
              PIECE_VALUES[piece.name] * (piece.owner === this.player.name ? -1 : 1)
          )
          .reduce((acc, v) => acc + v, 0) ?? 0;
      const pawnForwardsValue = move.pieceDeltas
        .filter(
          ({ pieceId }) =>
            this.gameMaster.game.board.getPiece(pieceId)?.name === PieceName.Pawn
        )
        .map(({ path }) => path.getLength() * 0.06)
        .reduce((acc, v) => acc + v, 0);
      const promotionValue = move.pieceDeltas
        .map((delta) => (delta.promoteTo ? PIECE_VALUES[delta.promoteTo] : 0))
        .reduce((acc, v) => acc + v, 0);
      return captureValue + pawnForwardsValue + promotionValue + Math.random() / 10;
    });
  }
}

const PIECE_VALUES: { [name in PieceName]: number } = {
  [PieceName.Pawn]: 1,
  [PieceName.Rook]: 5,
  [PieceName.King]: 1000,
  [PieceName.Queen]: 8,
  [PieceName.Bishop]: 3,
  [PieceName.Knight]: 3,
  [PieceName.BishopKnight]: 5,
  [PieceName.RookKnight]: 6,
  [PieceName.EarthPiece]: 1,
  [PieceName.FirePiece]: 1,
  [PieceName.LightningPiece]: 1,
  [PieceName.WaterPiece]: 1,
};
