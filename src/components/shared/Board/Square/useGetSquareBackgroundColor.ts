import { RuleName, Square, SquareShape, TokenName } from "game";
import { Colors } from "primitives";
import Color from "color";
import { GameContext } from "components/shared";
import { useContext } from "react";

export function useGetSquareBackgroundColor(
  square: Square | undefined,
  shape: SquareShape
): Color {
  const { gameMaster } = useContext(GameContext);
  const rules = gameMaster?.getRuleNames();
  if (!gameMaster || !square) return Colors.MCHESS_BLUE;

  return Colors.SQUARE[colorIndex({ ...square?.getCoordinates(), shape })].mix(
    Colors.DARK,
    shouldMixSquare(square, rules) ? 0.4 : 0
  );
}

function shouldMixSquare(square: Square, rules?: RuleName[]): boolean {
  return (
    !!rules?.includes("thinIce") &&
    (square.firstTokenWithName(TokenName.ThinIce)?.data?.thinIceData ?? 2) <= 1
  );
}

const colorIndex = ({
  rank,
  file,
  shape,
}: {
  rank: number;
  file: number;
  shape?: SquareShape;
}): number => {
  return shape === SquareShape.Hex ? rank % 3 : (rank + file) % 2;
};
