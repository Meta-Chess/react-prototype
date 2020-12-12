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
        "wss://fik1wh1ttf.execute-api.ap-southeast-2.amazonaws.com/dev",
      roomId
    );

    roomId = await gameClient.getRoomId();

    const onlineGameMaster = new OnlineGameMaster(
      renderer,
      gameOptions,
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
