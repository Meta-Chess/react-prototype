import { Player } from "domain/State/types";
import { Timer } from "./Timer";
import { Map } from "utilities";
import moment, { Moment } from "moment";

export class Clock {
  private timers: Map<Player, Timer>;

  constructor(players: Player[], allowance = 5 * 60 * 1000) {
    this.timers = Map.fromKeyArrayWithValueGenerator({
      keys: players,
      valueGenerator: () => new Timer(allowance),
    });
  }

  setActivePlayers(players: Player[]) {
    this.timers.keys().forEach((player) => {
      if (players.includes(player)) {
        this.timers.get(player)?.play();
      } else {
        console.log(this.timers.get(player));
        // this.timers.get(player)?.pause();
      }
    });
  }

  getPlayerClock(player: Player) {
    return this.timers.get(player)?.getClock();
  }
}
