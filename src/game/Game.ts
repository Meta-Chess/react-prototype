import { Board } from "./Board";
import { Clock } from "./Clock";
import { PlayerName } from "./types";
import { CompactRules } from "./Rules/CompactRules";
import { Player } from "game/Player";
import { Move } from "game/Move";

export class Game {
  constructor(
    public interrupt: CompactRules,
    public board: Board,
    public clock: Clock | undefined,
    public players: Player[] = [
      new Player(PlayerName.White),
      new Player(PlayerName.Black),
    ],
    public currentPlayerIndex: number = 0,
    public currentTurn: number = 1
  ) {}

  clone(): Game {
    return new Game(
      this.interrupt, // When we start updating the rules, we'll need to clone the interrupt, perhaps by storing the list of rules and regenerating
      this.board.clone(),
      undefined, // Clones don't need a clock at the moment
      this.players.map((p) => p.clone()),
      this.currentPlayerIndex,
      this.currentTurn
    );
  }

  resetTo(savePoint: Game): void {
    this.interrupt = savePoint.interrupt; // .resetTo(savePoint.interrupt);
    this.board.resetTo(savePoint.board);
    for (let i = 0; i < savePoint.players.length; i++) {
      this.players[i].resetTo(savePoint.players[i]);
    }
    this.currentPlayerIndex = savePoint.currentPlayerIndex;
    this.currentTurn = savePoint.currentTurn;
  }

  static createGame(interrupt: CompactRules, time: number | undefined): Game {
    const clock = time
      ? new Clock([PlayerName.White, PlayerName.Black], time)
      : undefined;
    clock?.setActivePlayers([PlayerName.White]);
    return new Game(interrupt, Board.createBoard(interrupt), clock);
  }

  doMove(move?: Move): void {
    if (!move) return;
    this.board.displacePieces(move.pieceDeltas);
    this.interrupt.for.postMove({
      board: this.board,
      move,
      currentTurn: this.currentTurn,
    });
    this.board.getPieces().forEach((piece) => {
      piece.removeExpiredTokens(this.currentTurn);
    });
    Object.values(this.board.squares).forEach((square) =>
      square.removeExpiredTokens(this.currentTurn)
    );
  }

  nextTurn(): void {
    const nextPlayerIndex = this.nextAlivePlayerIndex(this.currentPlayerIndex);
    if (nextPlayerIndex !== undefined) {
      this.currentPlayerIndex = nextPlayerIndex;
      this.clock?.setActivePlayers([this.players[nextPlayerIndex].name]);
      this.currentTurn++;
    }
  }

  nextAlivePlayerIndex(currentPlayerIndex: number): number | undefined {
    let index: number;
    for (let i = 1; i <= this.players.length; i++) {
      index = (currentPlayerIndex + i) % this.players.length;
      if (this.players[index].alive) return index;
    }
    return undefined;
  }

  alivePlayers(): Player[] {
    return this.players.filter((player) => player.alive);
  }

  getCurrentPlayerName(): PlayerName {
    return this.players[this.currentPlayerIndex].name;
  }
}
