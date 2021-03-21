import { AdviceLevel } from "game/variants";
import { FormatName } from "game/formats";

export interface Conflict {
  message: string;
  level: AdviceLevel;
  type?: FormatName;
}
