import { GameMaster } from "game/GameMaster";
import { AutomaticGameController } from "./AutomaticGameController";

export function startAutomaticPlay(gameMaster: GameMaster): () => void {
  const controller = new AutomaticGameController(gameMaster);
  controller.start();
  return controller.stop;
}
