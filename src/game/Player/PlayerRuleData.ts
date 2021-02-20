export interface PlayerRuleData {
  rollingVariantsCounter?: number;
}

export type PlayerRuleSetterInput = {
  [key in keyof Required<PlayerRuleData>]: {
    key: key;
    value: PlayerRuleData[key];
  };
}[keyof PlayerRuleData];
