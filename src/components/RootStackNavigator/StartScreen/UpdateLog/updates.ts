import type { UpdateGroup } from "./UpdateTypes";

export const updates: UpdateGroup[] = [
  {
    version: { major: 0, minor: 1, patch: 1 },
    date: new Date(2021, 9, 10),
    updates: [
      {
        label: "Variant",
        description: "Thin Ice!",
      },
      {
        label: "Update",
        description: "New parameter for Atomic",
      },

      {
        label: "Fix",
        description: "Move ambiguities were confused by changing piece types",
      },
    ],
  },
  {
    version: { major: 0, minor: 1, patch: 1 },
    date: new Date(2021, 9, 9),
    updates: [
      {
        label: "Variant",
        description: "Pawn Orbit!",
      },
    ],
  },
  {
    version: { major: 0, minor: 1, patch: 1 },
    date: new Date(2021, 9, 7),
    updates: [
      {
        label: "Variant",
        description: "Extinction!",
      },
      {
        label: "Update",
        description: "Variant card hover and bolder colors",
      },
    ],
  },
  {
    version: { major: 0, minor: 1, patch: 1 },
    date: new Date(2021, 9, 6),
    updates: [
      {
        label: "Update",
        description:
          "New parameters for Pathetic King, No Fork, Chemically Excited Knight and Fatigue",
      },
      {
        label: "Update",
        description:
          "Parameters that involve piece lists now include Pawns (promotion does not always behave well and will be fixed at some stage)",
      },
    ],
  },
];
