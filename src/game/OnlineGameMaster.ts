import { GameMaster } from "./GameMaster";
import { Renderer } from "./Renderer";
import { GameOptions, PlayerAssignment, TimestampMillis } from "game/types";
import { GameClient } from "game/GameClient";
import { Move } from "game/Move";
import { PlayerAction, Resignation, Draw } from "./PlayerAction";

export class OnlineGameMaster extends GameMaster {
  public clockUpdatePendingSince?: TimestampMillis;

  constructor(
    renderer: Renderer,
    gameOptions: GameOptions,
    assignedPlayer: PlayerAssignment,
    public roomId: string,
    private gameClient: GameClient,
    playerActionHistory: PlayerAction[] = [],
    replay = true
  ) {
    super(
      ...GameMaster.processConstructorInputs({
        gameOptions,
        assignedPlayer,
        renderer,
        playerActionHistory,
      })
    );
    if (replay) this.setPositionInHistoryToLatest();
  }

  static async connectNewGame(
    renderer: Renderer,
    gameOptions?: GameOptions,
    roomId?: string | undefined,
    onSpectating?: () => void
  ): Promise<OnlineGameMaster | undefined> {
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

    if (gameClient.assignedPlayer === "spectator") {
      onSpectating?.();
    }

    const onlineGameMaster = new OnlineGameMaster(
      renderer,
      gameClient.gameOptions,
      gameClient.assignedPlayer,
      roomId,
      gameClient,
      gameClient.playerActions
    );

    gameClient.setListeners({
      onPlayerAction: (playerAction: PlayerAction) => {
        onlineGameMaster.doPlayerAction({
          playerAction,
          received: true,
          unselect: false,
        });
      },
      onPlayerActionAcknowledged: (playerAction: PlayerAction) => {
        if (playerAction.timestamp && playerAction.type === "move" && playerAction.data) {
          onlineGameMaster.maybeUpdateClocks(playerAction.timestamp);
          onlineGameMaster.updateTimeOfMostRecentMove(playerAction.timestamp);
          onlineGameMaster.handlePossibleTimerFinish();
          onlineGameMaster.render();
        }
      },
    });

    return onlineGameMaster;
  }

  doPlayerAction({
    playerAction,
    unselect = true,
    received = false,
  }: {
    playerAction: PlayerAction;
    unselect?: boolean;
    received?: boolean;
  }): void {
    if (playerAction.type === "move") {
      this.doMove({
        move: playerAction.data,
        timestamp: playerAction.timestamp,
        unselect,
        received,
      });
    } else if (playerAction.type === "resign") {
      this.doResign({
        resignation: playerAction.data,
        timestamp: playerAction.timestamp,
        received,
      });
    } else if (playerAction.type === "draw") {
      this.toggleOfferDraw(playerAction.data, true);
    }
    this.calculateAllowableMovesForSelectedPieces();
    if (this.gameOver) this.disconnect();
    this.render();
  }

  toggleOfferDraw(draw: Draw, received = false): void {
    if (!received) {
      this.sendDraw(draw);
    }
    super.toggleOfferDraw(draw);
  }

  doResign({
    resignation,
    timestamp,
    received = false,
  }: {
    resignation: Resignation;
    timestamp?: TimestampMillis;
    received?: boolean;
  }): void {
    if (!received) {
      this.sendResign(resignation);
    }
    super.doResign({ resignation, timestamp });
  }

  doMove({
    move,
    timestamp,
    unselect,
    received = false,
  }: {
    move?: Move;
    timestamp?: TimestampMillis;
    unselect?: boolean;
    received?: boolean;
  } = {}): void {
    if (received) this.setPositionInHistory(this.playerActionHistory.length);
    const moveIsNew = this.stateIsCurrent();
    super.doMove({ move, timestamp, unselect });
    if (move && !received && moveIsNew)
      this.sendMove({ ...move, nextPlayerName: this.game.getCurrentPlayerName() });
    if (this.gameOver) this.disconnect();
  }

  sendMove(move?: Move): void {
    if (move)
      this.gameClient.sendPlayerAction({
        type: "move",
        data: move,
      });
  }

  sendResign(resign: Resignation): void {
    this.gameClient.sendPlayerAction({
      type: "resign",
      data: resign,
    });
  }

  sendDraw(draw: Draw): void {
    this.gameClient.sendPlayerAction({
      type: "draw",
      data: draw,
    });
  }

  maybeUpdateClocks(asOf?: TimestampMillis): void {
    if (!asOf) {
      this.clockUpdatePendingSince = Date.now();
      return;
    }
    this.clockUpdatePendingSince = undefined;
    super.maybeUpdateClocks(asOf);
  }

  updateTimeOfMostRecentMove(newTime?: TimestampMillis): void {
    if (!newTime) return;
    let searchIndex = this.playerActionHistory.length - 1;
    while (this.playerActionHistory[searchIndex]?.type !== "move") {
      searchIndex--;
      if (searchIndex < 0) return;
    }
    const indexOfLastMove = searchIndex;
    this.playerActionHistory[indexOfLastMove] = {
      ...this.playerActionHistory[indexOfLastMove],
      timestamp: newTime,
    };
  }

  disconnect(): void {
    this.gameClient?.close();
  }
}
