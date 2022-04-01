import type { UpdateGroup } from "./UpdateTypes";
import { getDaysBetweenDates } from "utilities/dates";

export const updates: UpdateGroup[] = [
  // note js month counting starts from 0 = january
  {
    version: { major: 0, minor: 1, patch: 1 },
    date: new Date(2022, 3, 1),
    updates: [
      {
        label: "Feature",
        description:
          "New Variant: Grand Chess! A 10x10 square board including fairy pieces",
      },
      {
        label: "Update",
        description: "UI tweaks, generic images for base boards",
      },
    ],
  },

  {
    version: { major: 0, minor: 1, patch: 1 },
    date: new Date(2021, 8, 26),
    updates: [
      {
        label: "Feature",
        description:
          "Variant cards redesign, traits redesign into game loop graph. Still evolving!",
      },
    ],
  },
  {
    version: { major: 0, minor: 1, patch: 1 },
    date: new Date(2021, 8, 22),
    updates: [
      {
        label: "Variant",
        description: "Diagonal Mirror! - bishops are deadly...",
      },
      {
        label: "Feature",
        description: "BOOM and piece immunity atomic params",
      },
    ],
  },
  {
    version: { major: 0, minor: 1, patch: 1 },
    date: new Date(2021, 8, 16),
    updates: [
      {
        label: "Update",
        description:
          "This update log! Access anytime via the help icon in the top right of the home screen",
      },
      {
        label: "Update",
        description: "Discord splash when public lobby is empty and other minor tweaks",
      },
    ],
  },
  {
    version: { major: 0, minor: 1, patch: 1 },
    date: new Date(2021, 8, 10),
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
    date: new Date(2021, 8, 9),
    updates: [
      {
        label: "Variant",
        description: "Pawn Orbit!",
      },
    ],
  },
  {
    version: { major: 0, minor: 1, patch: 1 },
    date: new Date(2021, 8, 7),
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
    date: new Date(2021, 8, 6),
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

const STOP_SHOWING_AFTER_DAY = 28; // 4 weeks

export const recentUpdates = updates.filter(
  (updateGroup) =>
    getDaysBetweenDates(new Date(Date.now()), updateGroup.date) <= STOP_SHOWING_AFTER_DAY
);
