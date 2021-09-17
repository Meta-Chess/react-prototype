import { Square } from "game/Board";
import { Pather } from "game/Pather";
import { Direction } from "game/types";
import { sum } from "lodash";
import { Rule, ParameterRule, AfterStepModify } from "../CompactRules";
import { rotate180 } from "../utilities";

export const diagonalMirror: ParameterRule = (): Rule => {
  return {
    title: "Diagonal Mirror",
    description: "Pieces may reflect diagonally off of edges.",
    afterStepModify: (input): AfterStepModify => {
      const { gait, remainingSteps, currentSquare, pather } = input;

      // TODO (Extension): handle more general reflection (ie lateral as apposed to diagonal reflection)
      if (!isDiagonal(remainingSteps[0])) return input;

      if (pather.go({ from: currentSquare, direction: remainingSteps[0] }).length)
        return input;

      const reflectedSquares = getReflections(pather, currentSquare, remainingSteps[0]);

      // TODO (Extension): handle multiple continuing squares then allow path splitting here
      if (!XOR(reflectedSquares)) return input;

      // TODO: generic edge detection
      const reflection = reflections[reflectedSquares.findIndex((x) => !!x)];

      return {
        gait: { ...gait, pattern: gait.pattern.map(reflection) },
        remainingSteps: remainingSteps.map(reflection),
        currentSquare,
        pather,
      };
    },
  };
};

function getReflections(
  pather: Pather,
  from: Square,
  to: Direction
): (Square | undefined)[] {
  return reflections
    .map((r) => r(to))
    .map((direction) =>
      isReflection(direction, to)
        ? pather.go({
            from,
            direction,
          })[0]
        : undefined
    );
}

function isReflection(reflected: Direction, unreflected: Direction): boolean {
  return reflected !== unreflected && reflected !== rotate180([unreflected])[0];
}

// TODO: put this stuff on the board probably

const nReflectionMap: { [d in Direction]?: Direction } = {
  [Direction.N]: Direction.S,
  [Direction.NE]: Direction.SE,
  [Direction.NW]: Direction.SW,
  [Direction.S]: Direction.N,
  [Direction.SE]: Direction.NE,
  [Direction.SW]: Direction.NW,
};

function nReflection(direction: Direction): Direction {
  return nReflectionMap[direction] ?? direction;
}

const eReflectionMap: { [d in Direction]?: Direction } = {
  [Direction.E]: Direction.W,
  [Direction.NE]: Direction.NW,
  [Direction.SE]: Direction.SW,
  [Direction.W]: Direction.E,
  [Direction.NW]: Direction.NE,
  [Direction.SW]: Direction.SE,
};

function eReflection(direction: Direction): Direction {
  return eReflectionMap[direction] ?? direction;
}

const h1ReflectionMap: { [d in Direction]?: Direction } = {
  [Direction.H1]: Direction.H7,
  [Direction.H2]: Direction.H6,
  [Direction.H3]: Direction.H5,
  [Direction.H5]: Direction.H3,
  [Direction.H6]: Direction.H2,
  [Direction.H7]: Direction.H1,
  [Direction.H8]: Direction.H12,
  [Direction.H9]: Direction.H11,
  [Direction.H11]: Direction.H9,
  [Direction.H12]: Direction.H8,
};

function h1Reflection(direction: Direction): Direction {
  return h1ReflectionMap[direction] ?? direction;
}

const h3ReflectionMap: { [d in Direction]?: Direction } = {
  [Direction.H1]: Direction.H11,
  [Direction.H2]: Direction.H10,
  [Direction.H3]: Direction.H9,
  [Direction.H4]: Direction.H8,
  [Direction.H5]: Direction.H7,
  [Direction.H7]: Direction.H5,
  [Direction.H8]: Direction.H4,
  [Direction.H9]: Direction.H3,
  [Direction.H10]: Direction.H2,
  [Direction.H11]: Direction.H1,
};

function h3Reflection(direction: Direction): Direction {
  return h3ReflectionMap[direction] ?? direction;
}

const h5ReflectionMap: { [d in Direction]?: Direction } = {
  [Direction.H1]: Direction.H3,
  [Direction.H3]: Direction.H1,
  [Direction.H4]: Direction.H12,
  [Direction.H5]: Direction.H11,
  [Direction.H6]: Direction.H10,
  [Direction.H7]: Direction.H9,
  [Direction.H9]: Direction.H7,
  [Direction.H10]: Direction.H6,
  [Direction.H11]: Direction.H5,
  [Direction.H12]: Direction.H4,
};

function h5Reflection(direction: Direction): Direction {
  return h5ReflectionMap[direction] ?? direction;
}

const reflections = [nReflection, eReflection, h1Reflection, h3Reflection, h5Reflection];

function XOR(a: unknown[]): boolean {
  return sum(a.map((x) => !!x)) === 1;
}

function isDiagonal(d?: Direction): boolean {
  return (
    d !== undefined &&
    [
      Direction.NE,
      Direction.NW,
      Direction.SE,
      Direction.SW,
      Direction.H1,
      Direction.H3,
      Direction.H5,
      Direction.H7,
      Direction.H9,
      Direction.H11,
    ].includes(d)
  );
}
