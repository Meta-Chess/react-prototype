import { PlayerName, TimestampMillis } from "game/types";
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

  setActivePlayers(players: PlayerName[], asOf: TimestampMillis): void {
    this.timers.keys().forEach((player) => {
      // `==` because player names from ".keys" are strings, but from players are numbers
      if (players.some((p) => p == player)) {
        this.timers.get(player)?.start(asOf);
      } else {
        this.timers.get(player)?.stop(asOf);
      }
    });
  }

  getPlayerTimer(player: PlayerName): Timer | undefined {
    return this.timers.get(player);
  }

  getInactivePlayers(): PlayerName[] {
    return this.timers.keys().filter((p) => !this.timers.get(p)?.isRunning());
  }

  stop(asOf: TimestampMillis): void {
    this.timers.values().forEach((t) => t.freeze(asOf));
  }

  updateStopTime(updateTo: TimestampMillis, player: PlayerName): void {
    this.timers.get(player)?.updateStopTime(updateTo);
  }

  updateStartTime(updateTo: TimestampMillis, player: PlayerName): void {
    this.timers.get(player)?.updateStartTime(updateTo);
  }
}
