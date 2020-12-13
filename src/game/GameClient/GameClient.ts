import { GameOptions, Move, PieceDelta } from "game/types";
import { Path } from "game/Pather/Path";
import { sleep } from "utilities/sleep";

class GameClient {
  private socket: WebSocket;
  private roomJoined: boolean;
  private onMove: ((move: Move) => void) | undefined;
  private messageListener: ((event: MessageEvent) => void) | undefined;
  public moves: Move[] = [];

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setMoves = (moves: any[]): void => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.moves = moves.map((move: any) => parseMove(move));
    };
    const onMove = this.onMove;

    this.messageListener = (event: MessageEvent): void => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "roomJoined":
          setRoomId(data.roomId);
          setGameOptions(data.gameOptions);
          setMoves(data.moves);
          setRoomJoined(true);
          break;
        case "move":
          // eslint-disable-next-line no-console
          if (!onMove) console.log("Received a move event without having onMove setup");
          onMove?.(parseMove(data.move));
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

  setOnMove(onMove: (move: Move) => void): void {
    this.onMove = onMove;
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
