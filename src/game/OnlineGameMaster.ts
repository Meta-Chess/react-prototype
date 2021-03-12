import { GameMaster } from "./GameMaster";
import { Renderer } from "./Renderer";
import { GameOptions, PlayerAssignment } from "game/types";
import { GameClient } from "game/GameClient";
import { sleep } from "utilities/sleep";
import { Move } from "game/Move";
import { PlayerAction, Resign } from "./PlayerAction";

export class OnlineGameMaster extends GameMaster {
  constructor(
    renderer: Renderer,
    gameOptions: GameOptions,
    assignedPlayer: PlayerAssignment,
    public roomId: string,
    private gameClient: GameClient,
    replay = true
  ) {
    super(
      ...GameMaster.processConstructorInputs({ gameOptions, assignedPlayer, renderer })
    );
    if (replay) this.doActionsSlowly(gameClient.playerActions);
  }

  async doActionsSlowly(actions: PlayerAction[]): Promise<void> {
    const shouldEvaluateEndGameConditions = this.evaluateEndGameConditions;
    this.evaluateEndGameConditions = false;
    for (const action of actions) {
      this.render();
      await sleep(50);
      if (action.type === "move")
        this.doMove({ move: action.data, unselect: true, received: true });
      else if (action.type === "resign") this.doResign(action.data, true);
      this.timersAsOf = action.timestamp;
    }
    this.timersAsOf = undefined;
    this.evaluateEndGameConditions = shouldEvaluateEndGameConditions;
    this.render();
  }

  doResign(resign: Resign, received = false): void {
    if (!received) {
      this.sendResign(resign);
    }
    super.doResign(resign);
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
      return undefined;
    }

    const onlineGameMaster = new OnlineGameMaster(
      renderer,
      gameClient.gameOptions,
      gameClient.assignedPlayer,
      roomId,
      gameClient
    );

    gameClient.setListeners({
      onPlayerAction: (playerAction: PlayerAction) => {
        if (playerAction.type === "move") {
          onlineGameMaster.doMove({
            move: playerAction.data,
            unselect: false,
            received: true,
          });
        } else if (playerAction.type === "resign") {
          onlineGameMaster.doResign(playerAction.data, true);
        }
        onlineGameMaster.calculateAllowableMovesForSelectedPieces();
        if (onlineGameMaster.gameOver) onlineGameMaster.disconnect();
        onlineGameMaster.render();
      },
      onPlayerActionAcknowledged: (playerAction: PlayerAction) => {
        if (playerAction.timestamp && playerAction.type === "move") {
          onlineGameMaster.game.clock?.updateStopTime(
            playerAction.timestamp,
            playerAction.data.playerName
          );
          if (playerAction.data.nextPlayerName) {
            onlineGameMaster.game.clock?.updateStartTime(
              playerAction.timestamp,
              playerAction.data.nextPlayerName
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
    if (received) this.setPositionInHistory(this.moveHistory.length);
    super.doMove({ move, unselect, fromHistory });
    if (move && !received && !fromHistory)
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

  sendResign(resign?: Resign): void {
    if (resign)
      this.gameClient.sendPlayerAction({
        type: "resign",
        data: resign,
      });
  }

  disconnect(): void {
    this.gameClient?.close();
  }
}
