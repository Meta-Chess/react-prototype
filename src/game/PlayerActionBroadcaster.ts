import { PlayerAction } from "game/PlayerAction";
import { IdGenerator } from "utilities/IdGenerator";

interface Connection {
  id: number;
  sendPlayerAction: (playerAction: PlayerAction) => void;
}

export class PlayerActionBroadcaster {
  private connections: Connection[] = [];
  private idGenerator = new IdGenerator();

  broadcastPlayerAction({
    playerAction,
    sourceConnectionId,
  }: {
    playerAction: PlayerAction;
    sourceConnectionId: number;
  }): void {
    this.connections.forEach(({ id: destinationConnectionId, sendPlayerAction }) => {
      if (sourceConnectionId !== destinationConnectionId) {
        sendPlayerAction(playerAction);
      }
    });
  }

  addConnection(sendPlayerAction: (playerAction: PlayerAction) => void): number {
    const id = this.idGenerator.getId();
    this.connections.push({ id, sendPlayerAction });
    return id;
  }
}
