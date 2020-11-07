import { Coordinates } from "game/board";

export const toLocation = ({
  rank,
  file,
  prefix,
}: Coordinates & { prefix?: string }): string => {
  return `${prefix || ""}R${rank}F${file}`;
};
