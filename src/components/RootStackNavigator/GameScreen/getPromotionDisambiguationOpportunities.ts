import { Move } from "game";
import { hasPresentKey } from "ts-is-present";

interface Promotion {
  pieceId: string;
  location: string;
}

export function gerPromotionDisambiguationOpportunities(moves?: Move[]): Promotion[] {
  if (!moves || moves.length < 2) return [];
  let promotionDisambiguationOpportunities = getPromotions(moves[0]);
  for (const move of moves) {
    const nextPromotions = getPromotions(move);
    promotionDisambiguationOpportunities = promotionDisambiguationOpportunities.filter(
      (promotion): boolean => nextPromotions.includes(promotion)
    );
    if (promotionDisambiguationOpportunities.length === 0) return [];
  }
  return promotionDisambiguationOpportunities;
}

function getPromotions(move: Move): Promotion[] {
  return move.pieceDeltas.filter(hasPresentKey("promoteTo")).map((delta) => ({
    pieceId: delta.pieceId,
    location: delta.path.getEnd(),
  }));
}
