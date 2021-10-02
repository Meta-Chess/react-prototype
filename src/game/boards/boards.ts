import { FutureVariantName } from "game/variants";

export type BoardVariantName = ("standard" | "hex" | "circular") & FutureVariantName;
export interface BoardVariant {
  variant: FutureVariantName;
  allowedPlayers: number[];
}
export const boardVariants: { [key in BoardVariantName]: BoardVariant } = {
  standard: { variant: "standard", allowedPlayers: [2] },
  circular: { variant: "circular", allowedPlayers: [2, 3, 4, 5, 6] },
  hex: { variant: "hex", allowedPlayers: [2] },
};

export const boardOrder: BoardVariantName[] = ["standard", "circular", "hex"];
