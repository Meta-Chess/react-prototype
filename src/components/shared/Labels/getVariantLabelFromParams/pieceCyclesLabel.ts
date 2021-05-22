import { RuleParamValues, ParamName } from "game/CompactRules";
import { PieceName } from "game";
import { pieceDetails } from "game/displayInfo";

export function pieceCyclesLabel(params: RuleParamValues, paramName: ParamName): string {
  let details = "";
  const pieceCycles = params[paramName] as PieceName[][];

  pieceCycles?.forEach((pieceCycle) => {
    let cycleString = pieceDetails[pieceCycle[0]].name;
    pieceCycle
      .slice(1)
      .forEach((piece) => (cycleString += ", " + pieceDetails[piece].name));
    details = details + "\n- Piece Cycle: " + cycleString;
  });

  return details;
}
