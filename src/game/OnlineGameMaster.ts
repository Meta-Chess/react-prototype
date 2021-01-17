import { GameMaster } from "./GameMaster";
import { Renderer } from "./Renderer";
import { GameOptions } from "game/types";
import { GameClient } from "game/GameClient";
import { sleep } from "utilities/sleep";
import { Move } from "game/Move";

export class OnlineGameMaster extends GameMaster {
  constructor(
    renderer: Renderer,
    gameOptions: GameOptions,
    public roomId: string,
    private gameClient: GameClient
  ) {
    super(...GameMaster.processConstructorInputs(gameOptions, renderer));
    this.doMovesSlowly(gameClient.moves);
  }

  async doMovesSlowly(moves: Move[]): Promise<void> {
    for (const move of moves) {
      await sleep(50);
      this.doMove(move);
      this.render();
    }
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
      roomId,
      gameClient
    );

    gameClient.setOnMove((move: Move) => {
      onlineGameMaster.doMove(move, false);
      onlineGameMaster.calculateAllowableMovesForSelectedPieces();
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
