import { Square } from "game/Board";
import { TokenName } from "game/types";
import { Rule, ParameterRule, OnPieceDisplaced } from "../CompactRules";
import { getDefaultParams } from "../utilities";

export const thinIce: ParameterRule = (
  ruleParams = getDefaultParams("thinIceSettings")
): Rule => {
  return {
    title: "Thin Ice",
    description:
      "You're skating on thin ice! When a square is moved to multiple times it breaks.",

    onPieceDisplaced: ({ board, pieceDelta }): OnPieceDisplaced => {
      const landingSquare = board.squareAt(pieceDelta.path.getEnd());
      const squareDurability = ruleParams["Square Durability"];

      if (!landingSquare || !squareDurability) return { board, pieceDelta };

      incrementThinIceToken(landingSquare, squareDurability);

      if (squareShouldBreak(landingSquare)) board.destroySquare(pieceDelta.path.getEnd());

      return { board, pieceDelta };
    },
  };
};

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
