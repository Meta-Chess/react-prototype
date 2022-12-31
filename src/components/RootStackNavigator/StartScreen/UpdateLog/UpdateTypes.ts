import { Colors } from "primitives";
import Color from "color";

type UpdateLabel = "Feature" | "Format" | "Variant" | "Update" | "Fix";

interface LabelStyle {
  color: Color;
}

export const updateLabelStyle: { [key in UpdateLabel]: LabelStyle } = {
  Feature: { color: Colors.MCHESS_ORANGE },
  Format: { color: Colors.MCHESS_ORANGE },
  Variant: { color: Colors.MCHESS_ORANGE },
  Update: { color: Colors.MCHESS_BLUE },
  Fix: { color: Colors.MCHESS_BLUE },
};

export interface Update {
  label: UpdateLabel;
  description: string;
}

interface Version {
  major: number;
  minor: number;
  patch: number;
}
export interface UpdateGroup {
  version: Version;
  date: Date;
  updates: Update[];
}
