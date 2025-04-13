import { PlayerAction } from "game/PlayerAction";
import { IdGenerator } from "utilities/IdGenerator";
import { PlayerActionCommunicator } from "./PlayerAgent";
import autoBind from "auto-bind";

interface Connection {
  id: number;
  sendPlayerAction: (playerAction: PlayerAction) => void;
}

export class PlayerActionBroadcaster {
  private connections: Connection[] = [];
  private idGenerator = new IdGenerator();

  private broadcastPlayerAction({
    playerAction,
    sourceConnectionId,
  }: {
    playerAction: PlayerAction;
    sourceConnectionId: number;
  }): void {
    this.connections.forEach(({ id: destinationConnectionId, sendPlayerAction }) => {
      if (sourceConnectionId !== destinationConnectionId) {
        setTimeout(() => sendPlayerAction(playerAction), 0);
      }
    });
  }

  public addConnection(communicator: PlayerActionCommunicator): void {
    const sourceConnectionId = this.idGenerator.getId();
    this.connections.push({
      id: sourceConnectionId,
      sendPlayerAction: communicator.receivePlayerAction,
    });

    communicator.setSendPlayerAction((playerAction) => {
      this.broadcastPlayerAction({ playerAction, sourceConnectionId });
    });
  }
}
