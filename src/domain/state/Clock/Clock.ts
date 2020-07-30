import { Player } from "domain/State/types";
import { Timer } from "./Timer";
import { Map } from "utilities";

export class Clock {
  private timers: Map<Player, Timer>;

  constructor(players: Player[], allowance = 5 * 60 * 1000) {
    this.timers = Map.fromKeyArrayWithValueGenerator({
      keys: players,
      valueGenerator: () => new Timer(allowance),
    });
  }

  setActivePlayers(players: Player[]): void {
    this.timers.keys().forEach((player) => {
      if (players.includes(player)) {
        this.timers.get(player)?.start();
      } else {
        this.timers.get(player)?.stop();
      }
    });
  }

  getPlayerTimer(player: Player): Timer | undefined {
    return this.timers.get(player);
  }

  getInactivePlayers(): Player[] {
    return this.timers.keys().filter((p) => !this.timers.get(p)?.isRunning());
  }
}
