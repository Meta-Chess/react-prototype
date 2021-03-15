import { GameOptions, PlayerAssignment } from "game/types";
import { Path } from "game/Pather";
import { sleep } from "utilities/sleep";
import { PlayerAction } from "game/PlayerAction";
import { PieceDelta } from "game/Move";

interface Listeners {
  onPlayerAction: (playerAction: PlayerAction) => void;
  onPlayerActionAcknowledged: (playerAction: PlayerAction) => void;
}

class GameClient {
  private socket: WebSocket;
  private roomJoined: boolean;
  private listeners: Partial<Listeners> = {};
  private messageListener: ((event: MessageEvent) => void) | undefined;
  public playerActions: PlayerAction[] = [];
  public assignedPlayer: PlayerAssignment = "spectator";

  constructor(url: string, private roomId?: string, public gameOptions?: GameOptions) {
    const socket = new WebSocket(url);
    this.socket = socket;
    this.roomJoined = false;

    this.socket.addEventListener("open", function (_event) {
      socket.send(JSON.stringify({ action: "joinRoom", roomId, gameOptions }));
    });

    this.messageListener = undefined;
    this.resetMessageEventListener();
  }

  async getRoomId(): Promise<string> {
    while (!this.roomJoined) await sleep(100);
    if (!this.roomId)
      throw new Error("Something broke! The room id should be defined by now!");
    return this.roomId;
  }

  resetMessageEventListener(): void {
    if (this.messageListener)
      this.socket.removeEventListener("message", this.messageListener);

    const setRoomJoined = (roomJoined: boolean): void => {
      this.roomJoined = roomJoined;
    };
    const setRoomId = (roomId: string | undefined): void => {
      this.roomId = roomId;
    };
    const setGameOptions = (gameOptions: GameOptions): void => {
      this.gameOptions = gameOptions;
    };
    const setAssignedPlayer = (assignedPlayer: PlayerAssignment): void => {
      this.assignedPlayer = assignedPlayer;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setPlayerActions = (playerActions: any[]): void => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.playerActions = playerActions.map((playerAction: any) =>
        parsePlayerAction(playerAction)
      );
    };
    const onPlayerAction = this.listeners.onPlayerAction;
    const onPlayerActionAcknowledged = this.listeners.onPlayerActionAcknowledged;

    this.messageListener = (event: MessageEvent): void => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "roomJoined":
          setRoomId(data.roomId);
          setGameOptions(data.gameOptions);
          setPlayerActions(data.playerActions);
          setAssignedPlayer(data.assignedPlayer);
          setRoomJoined(true);
          break;
        case "playerAction":
          if (!onPlayerAction)
            // eslint-disable-next-line no-console
            console.log(
              "Received a playerAction event without having onPlayerAction setup"
            );
          onPlayerAction?.(parsePlayerAction(data.playerAction));
          break;
        case "playerActionAcknowledgement":
          if (!onPlayerActionAcknowledged)
            console.log("onPlayerActionAcknowledged not found"); // eslint-disable-line no-console
          onPlayerActionAcknowledged?.(parsePlayerAction(data.playerAction));
          break;
        default:
          // eslint-disable-next-line no-console
          console.log(
            `Unrecognised event type ${data.type} of payload ${JSON.stringify(data)}`
          );
      }
    };
    this.socket.addEventListener("message", this.messageListener);
  }

  setListeners(listeners: Listeners): void {
    this.listeners = listeners;
    this.resetMessageEventListener();
  }

  sendPlayerAction(playerAction: PlayerAction): void {
    this.socket.send(
      JSON.stringify({ action: "playerAction", roomId: this.roomId, playerAction })
    );
  }

  close(): void {
    this.socket.close();
  }
}

// TODO: think about creating type JSO<T> to describe something that's been stringified and parsed?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePlayerAction(playerAction: any): PlayerAction {
  if (playerAction.type === "move") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pieceDeltas: PieceDelta[] = playerAction.data.pieceDeltas.map((delta: any) => ({
      ...delta,
      path: new Path(delta.path.start, delta.path.path),
    }));
    return { ...playerAction, data: { ...playerAction.data, pieceDeltas } };
  }
  return playerAction;
}

export { GameClient };
