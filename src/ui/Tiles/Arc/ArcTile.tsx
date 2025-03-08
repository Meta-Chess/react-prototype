import React, { FC } from "react";
import { Svg } from "react-native-svg";
import { AbsoluteView } from "ui/Containers";
import { SVG_TILE_WORKING_AREA } from "..";
import { PathWithNoOutline } from "primitives/OutlinelessComponents";
import type { TileProps } from "../TileProps";

export const ArcTile: FC<TileProps> = ({ tileSchematic, color, pressable = false }) => {
  if (tileSchematic === undefined) return <></>;

  return (
    <AbsoluteView pointerEvents={"none"}>
      <Svg
        viewBox={`0 0 ${SVG_TILE_WORKING_AREA} ${SVG_TILE_WORKING_AREA}`}
        pointerEvents={"none"}
      >
        <PathWithNoOutline
          d={tileSchematic.tilePath}
          fill={"none"}
          stroke={color.toString()}
          strokeWidth={tileSchematic.arcTileWidth || 0}
          pointerEvents={pressable ? "auto" : "none"}
        />
      </Svg>
    </AbsoluteView>
  );
};
