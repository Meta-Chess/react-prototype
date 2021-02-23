import React, { FC } from "react";
import { TileProps } from "../TileProps";
import { AdjustHexSvg } from "./AdjustHexSvg";
import { HexBoardLayoutTile } from "./HexBoardLayoutTile";
import { HexTileSvg } from "primitives/Tiles";

export const HexTile: FC<TileProps> = ({ size, color }) => {
  return (
    <>
      <HexBoardLayoutTile size={size} />
      <AdjustHexSvg size={size}>
        <HexTileSvg size={size} color={color} />
      </AdjustHexSvg>
    </>
  );
};
