import { PlayerName } from "./types";
import { cloneDeep } from "lodash";
import { Game } from "./Game";
import { Board, Square } from "./Board";

interface EventData {
  check: { playerName: PlayerName; game: Game };
  capture: { board: Board; square: Square };
}

type EventName = keyof EventData;
type SubscribeInput = {
  [key in EventName]: {
    name: key;
    consequence: (x: EventData[key]) => void;
  };
}[EventName];
type NotifyInput = {
  [key in EventName]: {
    name: key;
    data: EventData[key];
  };
}[EventName];

export class EventCenter {
  constructor(
    public subscriptions: { [key in EventName]?: ((x: EventData[key]) => void)[] }
  ) {}

  subscribe({ name, consequence }: SubscribeInput): void {
    // We give type security to the caller, but typescript will not check the types for us inside this function (well) - be very careful when editing this method
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (this.subscriptions[name]) this.subscriptions[name]?.push(consequence as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    else this.subscriptions[name] = [consequence as any];
  }

  notify({ name, data }: NotifyInput): void {
    // We give type security to the caller, but typescript will not check the types for us inside this function (well) - be very careful when editing this method
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.subscriptions[name]?.forEach((consequence: any) => consequence(data));
  }

  clone(): EventCenter {
    const cloneConstructorInput: Required<ConstructorParameters<typeof EventCenter>> = [
      cloneDeep(this.subscriptions),
    ];
    return new EventCenter(...cloneConstructorInput);
  }

  resetTo(savePoint: EventCenter): void {
    this.subscriptions = cloneDeep(savePoint.subscriptions);
  }
}
