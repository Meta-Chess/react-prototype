import { RuleParamValues, ParamName } from "game/CompactRules";
import { PieceName } from "game";
import { pieceDetails } from "game/displayInfo";

export function pieceCyclesLabel(
  params: RuleParamValues,
  paramName: ParamName,
  isSet = false
): string {
  let details = "";
  const pieceCycles = params[paramName] as PieceName[][];

  pieceCycles?.forEach((pieceCycle) => {
    let cycleString = pieceDetails[pieceCycle[0]]?.name; // TODO: this shows as undefined, want a function to clean up empty piece cycles.
    pieceCycle
      .slice(1)
      .forEach((piece) => (cycleString += ", " + pieceDetails[piece].name));
    details =
      details +
      (isSet ? "\n- Piece Set: " : "\n- Piece Cycle: ") +
      (cycleString ?? "No Pieces");
  });

  return details;
}
