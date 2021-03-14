import { Piece, PieceName, RuleName } from "game";
import { Direction } from "game/types";

export enum PieceDecorationName {
  UpDirectionArrow,
  DownDirectionArrow,
}

export function getPieceDecorationNames(
  piece: Piece,
  ruleNames?: RuleName[],
  flipBoard?: boolean
): PieceDecorationName[] {
  if (ruleNames === undefined || flipBoard === undefined) return [];

  const pieceDecorations: PieceDecorationName[] = [];
  if (piece.name === PieceName.Pawn && ruleNames.includes("longBoard")) {
    const gaits = piece.generateGaits();
    const northGait = gaits.some((gait) => gait.pattern[0] === Direction.N);
    const southGait = gaits.some((gait) => gait.pattern[0] === Direction.S);

    if ((northGait && !flipBoard) || (southGait && flipBoard)) {
      pieceDecorations.push(PieceDecorationName.UpDirectionArrow);
    }
    if ((southGait && !flipBoard) || (northGait && flipBoard)) {
      pieceDecorations.push(PieceDecorationName.DownDirectionArrow);
    }
  }

  return pieceDecorations;
}
