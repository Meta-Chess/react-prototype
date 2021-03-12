import { GameMaster } from "./GameMaster";
import { Renderer } from "./Renderer";
import { GameOptions, PlayerAssignment } from "game/types";
import { GameClient } from "game/GameClient";
import { sleep } from "utilities/sleep";
import { Move } from "game/Move";

export class OnlineGameMaster extends GameMaster {
  constructor(
    renderer: Renderer,
    gameOptions: GameOptions,
    assignedPlayer: PlayerAssignment,
    public roomId: string,
    private gameClient: GameClient
  ) {
    super(
      ...GameMaster.processConstructorInputs({ gameOptions, assignedPlayer, renderer })
    );
    this.doMovesSlowly(gameClient.moves);
  }

  async doMovesSlowly(moves: Move[]): Promise<void> {
    const shouldEvaluateEndGameConditions = this.evaluateEndGameConditions;
    this.evaluateEndGameConditions = false;
    for (const move of moves) {
      this.render();
      await sleep(50);
      this.doMove({ move, unselect: true, received: true });
      this.timersAsOf = move.timestamp;
    }
    this.timersAsOf = undefined;
    this.evaluateEndGameConditions = shouldEvaluateEndGameConditions;
    this.render();
  }

  static async connectNewGame(
    renderer: Renderer,
    gameOptions?: GameOptions,
    roomId?: string | undefined
  ): Promise<OnlineGameMaster> {
    const gameClient = new GameClient(
      process.env.REACT_APP_SERVER ||
        "wss://fik1wh1ttf.execute-api.ap-southeast-2.amazonaws.com/dev",
      roomId,
      gameOptions
    );

    roomId = await gameClient.getRoomId();

    if (!gameClient.gameOptions) {
      throw new Error("Game options should be set already");
    }

    const onlineGameMaster = new OnlineGameMaster(
      renderer,
      gameClient.gameOptions,
      gameClient.assignedPlayer,
      roomId,
      gameClient
    );

    gameClient.setListeners({
      onMove: (move: Move) => {
        onlineGameMaster.doMove({ move, unselect: false, received: true });
        onlineGameMaster.calculateAllowableMovesForSelectedPieces();
        if (onlineGameMaster.gameOver) onlineGameMaster.disconnect();
        onlineGameMaster.render();
      },
      onMoveAcknowledged: (move: Move) => {
        if (move.timestamp) {
          onlineGameMaster.game.clock?.updateStopTime(move.timestamp, move.playerName);
          if (move.nextPlayerName) {
            onlineGameMaster.game.clock?.updateStartTime(
              move.timestamp,
              move.nextPlayerName
            );
          }
          onlineGameMaster.handlePossibleTimerFinish();
          onlineGameMaster.render();
        }
      },
    });

    return onlineGameMaster;
  }

  doMove({
    move,
    unselect,
    fromHistory,
    received = false,
  }: {
    move?: Move;
    unselect?: boolean;
    received?: boolean;
    fromHistory?: boolean;
  } = {}): void {
    super.doMove({ move, unselect, fromHistory });
    if (received) this.setPositionInHistory(this.moveHistory.length);
    if (move && !received)
      this.sendMove({ ...move, nextPlayerName: this.game.getCurrentPlayerName() });
    if (this.gameOver) this.disconnect();
  }

  sendMove(move?: Move): void {
    if (move) this.gameClient.sendMove(move);
  }

  disconnect(): void {
    this.gameClient?.close();
  }
}
