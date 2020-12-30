import { PlayerName } from "game/types";
import { Timer } from "./Timer";
import { Map } from "utilities";

export class Clock {
  private timers: Map<PlayerName, Timer>;

  constructor(players: PlayerName[], allowance = 0.25 * 60 * 1000) {
    this.timers = Map.fromKeyArrayWithValueGenerator({
      keys: players,
      valueGenerator: () => new Timer(allowance),
    });
  }

  setActivePlayers(players: PlayerName[]): void {
    this.timers.keys().forEach((player) => {
      if (players.some((p) => p == player)) {
        this.timers.get(player)?.start();
      } else {
        this.timers.get(player)?.stop();
      }
    });
  }

  getPlayerTimer(player: PlayerName): Timer | undefined {
    return this.timers.get(player);
  }

  getInactivePlayers(): PlayerName[] {
    return this.timers.keys().filter((p) => !this.timers.get(p)?.isRunning());
  }

  stop(): void {
    this.timers.values().forEach((t) => t.freeze());
  }
}
