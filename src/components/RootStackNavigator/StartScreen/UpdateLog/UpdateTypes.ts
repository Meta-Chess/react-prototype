import { Colors } from "primitives";
import Color from "color";

type UpdateLabel = "Format" | "Variant" | "Update" | "Fix";

interface LabelInfo {
  color: Color;
}

export const updateLabelInfo: { [key in UpdateLabel]: LabelInfo } = {
  Format: { color: Colors.MCHESS_ORANGE },
  Variant: { color: Colors.MCHESS_ORANGE },
  Update: { color: Colors.MCHESS_BLUE },
  Fix: { color: Colors.MCHESS_BLUE },
};

export interface Update {
  label: UpdateLabel;
  description: string;
}

export interface UpdateGroup {
  version: number[]; //major, minor, patch
  date: Date; //year, month, day
  updates: Update[];
}

export const updateGroups: UpdateGroup[] = [
  {
    version: [0, 1, 1],
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
    version: [0, 1, 1],
    date: new Date(2021, 9, 9),
    updates: [
      {
        label: "Variant",
        description: "Pawn Orbit!",
      },
    ],
  },
  {
    version: [0, 1, 1],
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
    version: [0, 1, 1],
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
