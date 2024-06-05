import { GameMaster } from "game/GameMaster";
import { AutomaticGameController } from "./AutomaticGameController";

export function startAutomaticPlay(
  gameMaster: GameMaster,
  onEndGame: () => void
): () => void {
  const controller = new AutomaticGameController(gameMaster, onEndGame);
  controller.start();
  return controller.stop;
}
