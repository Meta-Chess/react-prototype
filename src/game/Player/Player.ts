import { TokenOwner } from "game/Board/TokenOwner";
import { PlayerName, Token } from "game/types";
import { cloneDeep } from "lodash";
import { PlayerRuleData, PlayerRuleSetterInput } from "./PlayerRuleData";

export class Player extends TokenOwner {
  private ruleData: PlayerRuleData = {}; // TODO: is this being cloned/reset?
  public connected = false;

  constructor(
    public name: PlayerName,
    public alive: boolean = true,
    public tokens: Token[] = [],
    public wantsToDraw: boolean = false,
    public endGameMessage: string = "",
    public hasLegalMoves: { value: boolean; subTurn: number } = {
      value: false,
      subTurn: -1,
    }
  ) {
    super(tokens);
  }

  clone(): Player {
    const cloneConstructorInput: Required<ConstructorParameters<typeof Player>> = [
      this.name,
      this.alive,
      this.cloneTokens(this.tokens),
      this.wantsToDraw,
      this.endGameMessage,
      cloneDeep(this.hasLegalMoves),
    ];
    return new Player(...cloneConstructorInput);
  }

  resetTo(savePoint: Player): void {
    this.name = savePoint.name;
    this.tokens = cloneDeep(savePoint.tokens);
    this.alive = savePoint.alive;
    this.wantsToDraw = savePoint.wantsToDraw;
    this.endGameMessage = savePoint.endGameMessage;
    this.hasLegalMoves = {
      value: savePoint.hasLegalMoves.value,
      subTurn: savePoint.hasLegalMoves.subTurn,
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
