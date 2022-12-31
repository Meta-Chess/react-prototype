import { Square } from "game/Board";
import { TokenName } from "game/types";
import { OnPieceDisplaced, ParameterRule } from "../CompactRules";

export const thinIce: ParameterRule<"thinIce"> = ({
  "Square Durability": squareDurability,
}) => ({
  title: "Thin Ice",
  description:
    "You're skating on thin ice! When a square is moved to multiple times it breaks.",

  onPieceDisplaced: ({ board, pieceDelta }): OnPieceDisplaced => {
    const landingSquare = board.squareAt(pieceDelta.path.getEnd());

    if (!landingSquare || !squareDurability) return { board, pieceDelta };

    incrementThinIceToken(landingSquare, squareDurability);

    if (squareShouldBreak(landingSquare)) board.destroySquare(pieceDelta.path.getEnd());

    return { board, pieceDelta };
  },
});

function squareShouldBreak(square?: Square): boolean {
  return getStepAllowanceOnSquare(square) <= 0;
}

function getStepAllowanceOnSquare(square?: Square): number {
  return square?.firstTokenWithName(TokenName.ThinIce)?.data?.thinIceData || 0;
}

function incrementThinIceToken(square: Square, squareDurability: number): void {
  const currentToken = square.firstTokenWithName(TokenName.ThinIce);
  square.removeTokensByName(TokenName.ThinIce);
  square.addToken({
    name: TokenName.ThinIce,
    data: { thinIceData: (currentToken?.data?.thinIceData ?? squareDurability) - 1 },
    expired: () => false,
  });
}
