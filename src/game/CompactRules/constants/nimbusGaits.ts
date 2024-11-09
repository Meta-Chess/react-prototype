import { Direction, Gait } from "game/types";

const TriangularHexagonalDirections = [
  Direction.TH1,
  Direction.TH2,
  Direction.TH3,
  Direction.TH4,
  Direction.TH5,
  Direction.TH6,
];
const TriangularEdgeDirections = [Direction.TE1, Direction.TE2, Direction.TE3];

const turnDirections = (A: Direction): Direction[] => {
  switch (A) {
    case Direction.TC1:
      return [Direction.TE2, Direction.TE3];
    case Direction.TC2:
      return [Direction.TE1, Direction.TE3];
    case Direction.TC3:
      return [Direction.TE1, Direction.TE2];
    case Direction.TE1:
      return [Direction.TC2, Direction.TC3];
    case Direction.TE2:
      return [Direction.TC1, Direction.TC3];
    case Direction.TE3:
      return [Direction.TC1, Direction.TC2];
    case Direction.TH1:
      return [Direction.TH6, Direction.TH1];
    case Direction.TH2:
      return [Direction.TH1, Direction.TH3];
    case Direction.TH3:
      return [Direction.TH2, Direction.TH4];
    case Direction.TH4:
      return [Direction.TH3, Direction.TH5];
    case Direction.TH5:
      return [Direction.TH4, Direction.TH6];
    case Direction.TH6:
      return [Direction.TH5, Direction.TH1];
    default:
      throw new Error("Invalid direction");
  }
};

export const nimbusGaits: { [type: string]: Gait[] } = {
  FIRE: TriangularEdgeDirections.map((A) =>
    TriangularEdgeDirections.map((B) => {
      return {
        pattern: [A, B, A, B],
        interruptable: true,
      };
    })
  )
    .flat()
    .flat(),
  WATER: [
    {
      pattern: [Direction.TC1, Direction.TE1],
      repeats: true,
      interruptable: true,
    },
    {
      pattern: [Direction.TC2, Direction.TE2],
      repeats: true,
      interruptable: true,
    },
    {
      pattern: [Direction.TC3, Direction.TE3],
      repeats: true,
      interruptable: true,
    },
  ],
  EARTH: [
    ...[
      [Direction.TE1, Direction.TC1],
      [Direction.TE2, Direction.TC2],
      [Direction.TE3, Direction.TC3],
    ]
      .map((ds) => {
        return [
          { pattern: ds, nonBlocking: true },
          ...turnDirections(ds[1]).map((d3) => [
            { pattern: [...ds, d3], nonBlocking: true },
          ]),
        ];
      })
      .flat()
      .flat(),
  ],
  LIGHTNING: [
    ...TriangularHexagonalDirections.map((A) => ({
      pattern: [A, A],
      interruptable: true,
    })),
    ...TriangularHexagonalDirections.flatMap((A) =>
      turnDirections(A).map((B) => [{ pattern: [A, B] }])
    ).flat(),
  ],
};
