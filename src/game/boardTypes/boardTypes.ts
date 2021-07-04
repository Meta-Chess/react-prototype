import { FutureVariantName } from "../variants";

export const defaultBoardVariant = "standard";

export interface BoardType {
  title: string;
  description: string;
  baseVariant: FutureVariantName;
  allowedPlayers: number[];
}

// BoardType will filter variants --> no variants which clash with their base (...a general blacklist problem...)
// switching BoardType will wipe selected variants

export type BoardTypeName = "standard" | "hex" | "longBoard";

export const boardTypes: { [key in BoardTypeName]: BoardType } = {
  standard: {
    title: "Standard",
    description: "A regulation chess board.",
    baseVariant: "standard",
    allowedPlayers: [2],
  },
  hex: {
    title: "Hex",
    description:
      "Hexagonal tiles on a hexagonal board. Hexes have up to 12 neighbours - watch out for diagonals.",
    baseVariant: "hex",
    allowedPlayers: [2],
  },
  longBoard: {
    title: "Longboard",
    description:
      "The top and bottom rows are connected and pawns march the way they are pointing.",
    baseVariant: "longBoard",
    allowedPlayers: [2, 3, 4, 5, 6],
  },
};
