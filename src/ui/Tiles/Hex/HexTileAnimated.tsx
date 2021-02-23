import React, { FC } from "react";
import { HexTileSvg } from "primitives/Tiles";
import { AdjustHexSvg } from "./AdjustHexSvg";
import { HexBoardLayoutTile } from "./HexBoardLayoutTile";
import { AnimatedTileProps } from "../TileProps";

export const HexTileAnimated: FC<AnimatedTileProps> = ({ size, color }) => {
  return (
    <>
      <HexBoardLayoutTile size={size} />
      <AdjustHexSvg size={0}>
        <HexTileSvg size={size} animatedColor={color} />
      </AdjustHexSvg>
    </>
  );
};
