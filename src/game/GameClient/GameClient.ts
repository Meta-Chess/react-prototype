import { GameOptions, PlayerAssignment } from "game/types";
import { Path } from "game/Pather";
import { sleep } from "utilities/sleep";
import { Move, PieceDelta } from "game/Move";

interface Listeners {
  onMove: (move: Move) => void;
  onMoveAcknowledged: (move: Move) => void;
}

class GameClient {
  private socket: WebSocket;
  private roomJoined: boolean;
  private listeners: Partial<Listeners> = {};
  private messageListener: ((event: MessageEvent) => void) | undefined;
  public moves: Move[] = [];
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
    const setMoves = (moves: any[]): void => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.moves = moves.map((move: any) => parseMove(move));
    };
    const onMove = this.listeners.onMove;
    const onMoveAcknowledged = this.listeners.onMoveAcknowledged;

    this.messageListener = (event: MessageEvent): void => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "roomJoined":
          setRoomId(data.roomId);
          setGameOptions(data.gameOptions);
          setMoves(data.moves);
          setAssignedPlayer(data.assignedPlayer);
          setRoomJoined(true);
          break;
        case "move":
          if (!onMove) console.log("Received a move event without having onMove setup"); // eslint-disable-line no-console
          onMove?.(parseMove(data.move));
          break;
        case "moveAcknowledgement":
          if (!onMoveAcknowledged) console.log("onMoveAcknowledged not found"); // eslint-disable-line no-console
          onMoveAcknowledged?.(parseMove(data.move));
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

  sendMove(move: Move): void {
    this.socket.send(JSON.stringify({ action: "move", roomId: this.roomId, move }));
  }

  close(): void {
    this.socket.close();
  }
}

// TODO: think about creating type JSO<T> to describe something that's been stringified and parsed?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseMove(move: any): Move {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pieceDeltas: PieceDelta[] = move.pieceDeltas.map((delta: any) => ({
    ...delta,
    path: new Path(delta.path.start, delta.path.path),
  }));
  return { ...move, pieceDeltas };
}

export { GameClient };
