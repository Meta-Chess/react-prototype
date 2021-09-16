import { Direction } from "game/types";
import { Rule, ParameterRule, AfterStepModify } from "../CompactRules";

export const diagonalMirror: ParameterRule = (): Rule => {
  return {
    title: "Diagonal Mirror",
    description: "Pieces may reflect diagonally off of edges.",
    afterStepModify: (input): AfterStepModify => {
      const { gait, remainingSteps, currentSquare, pather } = input;

      if (!isDiagonal(remainingSteps[0])) return input;

      if (pather.go({ from: currentSquare, direction: remainingSteps[0] }).length)
        return input;
      const vReflectedSquare = pather.go({
        from: currentSquare,
        direction: vReflection(remainingSteps[0]),
      })[0];

      const hReflectedSquare = pather.go({
        from: currentSquare,
        direction: hReflection(remainingSteps[0]),
      })[0];

      // TODO: handle multiple continuing squares then allow path splitting here.
      if (!XOR(hReflectedSquare, vReflectedSquare)) return input;

      return hReflectedSquare
        ? {
            gait: { ...gait, pattern: gait.pattern.map(hReflection) },
            remainingSteps: remainingSteps.map(hReflection),
            currentSquare,
            pather,
          }
        : {
            gait: { ...gait, pattern: gait.pattern.map(vReflection) },
            remainingSteps: remainingSteps.map(vReflection),
            currentSquare,
            pather,
          };
    },
  };
};

const hReflectionMap: { [d in Direction]?: Direction } = {
  [Direction.N]: Direction.S,
  [Direction.NE]: Direction.SE,
  [Direction.NW]: Direction.SW,
  [Direction.S]: Direction.N,
  [Direction.SE]: Direction.NE,
  [Direction.SW]: Direction.NW,
};

function hReflection(direction: Direction): Direction {
  return hReflectionMap[direction] ?? direction;
}

const vReflectionMap: { [d in Direction]?: Direction } = {
  [Direction.E]: Direction.W,
  [Direction.NE]: Direction.NW,
  [Direction.SE]: Direction.SW,
  [Direction.W]: Direction.E,
  [Direction.NW]: Direction.NE,
  [Direction.SW]: Direction.SE,
};

function vReflection(direction: Direction): Direction {
  return vReflectionMap[direction] ?? direction;
}

function XOR(a: unknown, b: unknown): boolean {
  return !a !== !b;
}

function isDiagonal(d?: Direction): boolean {
  return (
    d !== undefined &&
    [Direction.NE, Direction.NW, Direction.SE, Direction.SW].includes(d)
  );
}
