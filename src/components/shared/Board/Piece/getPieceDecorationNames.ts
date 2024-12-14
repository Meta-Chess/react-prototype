import { Piece, PieceName } from "game";
import { Direction } from "game/types";
import { GameMaster } from "game";
import { TokenName } from "game/types";

export enum PieceDecorationName {
  UpDirectionArrow,
  DownDirectionArrow,
  ClockwiseDirectionArrow,
  AnticlockwiseDirectionArrow,
  NimbusSymbol,
}

export function getPieceDecorationNames(
  piece: Piece,
  gameMaster?: GameMaster
): PieceDecorationName[] {
  const ruleNames = gameMaster?.getRuleNames();
  if (ruleNames === undefined) return [];

  const pieceDecorations: PieceDecorationName[] = [];
  if (piece.name === PieceName.Pawn && ruleNames.includes("longBoard")) {
    const gaits = piece.generateGaits();
    const northGait = gaits.some((gait) => gait.pattern[0] === Direction.N);
    const southGait = gaits.some((gait) => gait.pattern[0] === Direction.S);

    if (northGait) {
      pieceDecorations.push(PieceDecorationName.UpDirectionArrow);
    }
    if (southGait) {
      pieceDecorations.push(PieceDecorationName.DownDirectionArrow);
    }
  }

  if (ruleNames.includes("nimbus") && piece.hasTokenWithName(TokenName.Nimbus)) {
    pieceDecorations.push(PieceDecorationName.NimbusSymbol);
  }

  return pieceDecorations;
}
