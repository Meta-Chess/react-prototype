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
  // TODO: Should use interruption points or something similar to handle rule based logic
  const rules = gameMaster?.getRuleNames();
  const board = gameMaster?.game.board;
  if (!gameMaster || !square) return Colors.MCHESS_BLUE;

  let baseColor = Colors.SQUARE[colorIndex({ ...square?.getCoordinates(), shape })];

  if (rules?.includes("nimbus")) {
    baseColor =
      colorIndex({ ...square?.getCoordinates(), shape }) === 0
        ? Colors.NIMBUS.SQUARE[0]
        : Colors.NIMBUS.SQUARE[1];
  }

  if (!!rules?.includes("emptyCenter") && board?.squareInRegion(square, "center")) {
    baseColor = baseColor.desaturate(1).mix(Color("red"), 0.2);
  }

  return baseColor.mix(Colors.DARK, shouldMixSquare(square, rules) ? 0.4 : 0);
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
