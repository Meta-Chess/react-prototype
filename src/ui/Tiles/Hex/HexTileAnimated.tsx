import React, { FC } from "react";
import { HexTileSvg } from "primitives/Tiles";
import { AdjustHexSvg } from "./AdjustHexSvg";
import { AnimatedTileProps } from "../TileProps";

export const HexTileAnimated: FC<AnimatedTileProps> = ({ size, color }) => {
  return (
    <AdjustHexSvg size={0}>
      <HexTileSvg size={size} animatedColor={color} />
    </AdjustHexSvg>
  );
};
