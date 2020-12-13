import { GameMaster } from "./GameMaster";
import { Renderer } from "./Renderer";
import { GameOptions, Move } from "game/types";
import { GameClient } from "game/GameClient";

export class OnlineGameMaster extends GameMaster {
  constructor(
    renderer: Renderer,
    gameOptions: GameOptions,
    public roomId: string,
    private gameClient: GameClient
  ) {
    super(gameOptions, renderer);
  }

  static async connectNewGame(
    renderer: Renderer,
    gameOptions: GameOptions,
    roomId?: string | undefined
  ): Promise<OnlineGameMaster> {
    const gameClient = new GameClient(
      process.env.REACT_APP_SERVER ||
        "wss://arf34qu32l.execute-api.ap-southeast-2.amazonaws.com/prod",
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
      roomId,
      gameClient
    );

    gameClient.setOnMove((move: Move) => {
      onlineGameMaster.game.doMove(move);
      onlineGameMaster.render();
    });

    return onlineGameMaster;
  }

  onPress(location: string): Move | undefined {
    const move = super.onPress(location);
    if (move) this.gameClient.sendMove(move);
    return move;
  }

  endGame(): void {
    this.gameClient?.close();
  }
}
