import { Board } from "./Board";
import { Clock } from "./Clock";
import { Move, Player } from "./types";
import { CompactRules } from "./Rules/Rules";

export class Game {
  constructor(
    public interrupt: CompactRules,
    public board: Board,
    public clock: Clock | undefined,
    public players: Player[],
    public currentPlayer: Player,
    public currentTurn: number
  ) {}

  static createGame(interrupt: CompactRules, time: number | undefined): Game {
    const clock = time ? new Clock([Player.White, Player.Black], time) : undefined;
    clock?.setActivePlayers([Player.White]);
    return new Game(
      interrupt,
      Board.createBoard(interrupt),
      clock,
      [Player.White, Player.Black],
      Player.White,
      1
    );
  }

  clone(): Game {
    return new Game(
      this.interrupt, // When we start updating the rules, we'll need to clone the interrupt, perhaps by storing the list of rules and regenerating
      this.board.clone(),
      undefined, // Clones don't need a clock at the moment
      this.players,
      this.currentPlayer,
      this.currentTurn
    );
  }

  doMove(move?: Move): void {
    if (!move) return;

    this.board.displacePieces(move.pieceDeltas);

    this.interrupt.for.postMove({ move });

    this.nextTurn();
  }

  nextTurn(): void {
    const currentIndex = this.players.indexOf(this.currentPlayer);
    this.currentPlayer = this.players[(currentIndex + 1) % this.players.length];
    this.clock?.setActivePlayers([this.currentPlayer]);
  }
}