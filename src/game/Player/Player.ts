import { PlayerName } from "game/types";
import { cloneDeep } from "lodash";
import { PlayerRuleData, PlayerRuleSetterInput } from "./PlayerRuleData";

export class Player {
  private ruleData: PlayerRuleData = {};
  public connected = false;

  constructor(
    public name: PlayerName,
    public alive: boolean = true,
    public wantsToDraw: boolean = false,
    public endGameMessage: string = "",
    public hasLegalMoves: { value: boolean; turn: number } = {
      value: false,
      turn: -1,
    }
  ) {}

  clone(): Player {
    const cloneConstructorInput: Required<ConstructorParameters<typeof Player>> = [
      this.name,
      this.alive,
      this.wantsToDraw,
      this.endGameMessage,
      cloneDeep(this.hasLegalMoves),
    ];
    return new Player(...cloneConstructorInput);
  }

  resetTo(savePoint: Player): void {
    this.name = savePoint.name;
    this.alive = savePoint.alive;
    this.wantsToDraw = savePoint.wantsToDraw;
    this.endGameMessage = savePoint.endGameMessage;
    this.hasLegalMoves = {
      value: savePoint.hasLegalMoves.value,
      turn: savePoint.hasLegalMoves.turn,
    };
  }

  getRuleData(key: keyof PlayerRuleData): PlayerRuleData[keyof PlayerRuleData] {
    return this.ruleData[key];
  }

  setRuleData({ key, value }: PlayerRuleSetterInput): void {
    this.ruleData[key] = value;
  }

  setConnected(connected: boolean): void {
    this.connected = connected;
  }
}
