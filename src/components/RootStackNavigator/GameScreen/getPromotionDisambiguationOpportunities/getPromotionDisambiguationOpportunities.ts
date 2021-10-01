import { Move, PieceName } from "game";
import { hasPresentKey } from "ts-is-present";
import { isEqual } from "lodash";

interface Promotion {
  pieceId: string;
  location: string;
}

export function getPromotionDisambiguationOpportunities(moves?: Move[]): Promotion[] {
  if (!moves || moves.length < 2) return [];
  let promotionDisambiguationOpportunities = getPromotions(moves[0]);
  for (let i = 1; i < moves.length; i++) {
    const nextPromotions = getPromotions(moves[i]);
    promotionDisambiguationOpportunities = promotionDisambiguationOpportunities.filter(
      (promotion): boolean => nextPromotions.some((x) => isEqual(x, promotion))
    );
    if (promotionDisambiguationOpportunities.length === 0) return [];
  }
  return promotionDisambiguationOpportunities.filter(promotionAmbiguous(moves));
}

const promotionAmbiguous =
  (moves: Move[]) =>
  (promotion: Promotion): boolean => {
    const promotionPieces = moves
      .map((m) =>
        m.pieceDeltas.find(
          (d) => d.pieceId === promotion.pieceId && d.path.getEnd() === promotion.location
        )
      )
      .map((d) => d?.promoteTo) as PieceName[];
    return promotionPieces.findIndex((p) => p !== promotionPieces[0]) > -1;
  };

function getPromotions(move: Move): Promotion[] {
  return move.pieceDeltas.filter(hasPresentKey("promoteTo")).map((delta) => ({
    pieceId: delta.pieceId,
    location: delta.path.getEnd(),
  }));
}
