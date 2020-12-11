import {Move, PieceDelta} from "game/types";
import {Path} from "game/Pather/Path";

class GameClient {
    private socket: WebSocket;
    constructor(url: string, onMove: any, setRoomId: any, private roomId: string | undefined) {
        const socket = new WebSocket(url);
        this.socket = socket;

        this.socket.addEventListener("open", function (event) {
            socket.send(JSON.stringify({ action: "joinRoom", roomId }));
            setRoomId(roomId);
        });

        this.socket.addEventListener("message", function (event) {
            console.log(event.data);
            onMove(parseMove(event.data));
        });
    }

    sendMove(move: Move): void {
        this.socket.send(JSON.stringify({ action: "move", roomId: this.roomId, move }));
    }

    close(): void {
        this.socket.close();
    }
}

function parseMove(moveJSON: string): Move {
    const move = JSON.parse(moveJSON);

    const pieceDeltas: PieceDelta[] = move.pieceDeltas.map((delta: any) => ({
        ...delta,
        path: new Path(delta.path.start, delta.path.path),
    }));
    return { ...move, pieceDeltas };
}

export { GameClient };