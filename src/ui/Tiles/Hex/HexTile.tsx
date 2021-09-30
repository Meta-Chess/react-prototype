import React, { FC } from "react";
import { TileProps } from "../TileProps";
import { AdjustHexSvg } from "./AdjustHexSvg";
import { HexTileSvg } from "primitives/Tiles";

export const HexTile: FC<TileProps> = ({ size, color }) => {
  if (size === undefined) return <></>;
  return (
    <AdjustHexSvg size={size}>
      <HexTileSvg size={size} color={color} />
    </AdjustHexSvg>
  );
};
