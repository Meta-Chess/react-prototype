import { PlayerAction } from "game/PlayerAction";
import { IdGenerator } from "utilities/IdGenerator";

interface Connection {
  id: number;
  onPlayerAction: (playerAction: PlayerAction) => void;
}

export class PlayerActionBroadcaster {
  private connections: Connection[] = [];
  private idGenerator = new IdGenerator();

  onPlayerAction({
    playerAction,
    sourceConnectionId,
  }: {
    playerAction: PlayerAction;
    sourceConnectionId: number;
  }): void {
    this.connections.forEach(({ id: destinationConnectionId, onPlayerAction }) => {
      if (sourceConnectionId !== destinationConnectionId) {
        onPlayerAction(playerAction);
      }
    });
  }

  addConnection(onPlayerAction: (playerAction: PlayerAction) => void): number {
    const id = this.idGenerator.getId();
    this.connections.push({ id, onPlayerAction });
    return id;
  }
}
