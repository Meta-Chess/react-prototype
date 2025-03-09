import React, { FC } from "react";
import { Svg } from "react-native-svg";
import type { AnimatedTileProps } from "../TileProps";
import { AnimatedGroup } from "primitives";
import { AbsoluteView } from "ui/Containers";
import { SVG_TILE_WORKING_AREA } from "..";
import { PathWithNoOutline } from "primitives/OutlinelessComponents";

export const TriangleTileAnimated: FC<AnimatedTileProps> = ({
  tileSchematic,
  color,
  pressable,
}) => {
  if (tileSchematic === undefined) return <></>;
  return (
    <AbsoluteView pointerEvents={"none"}>
      <Svg
        viewBox={`0 0 ${SVG_TILE_WORKING_AREA} ${SVG_TILE_WORKING_AREA}`}
        pointerEvents={"none"}
      >
        <AnimatedGroup fill={color} pointerEvents={"none"}>
          <PathWithNoOutline
            d={tileSchematic.tilePath}
            stroke={"none"}
            pointerEvents={pressable ? "auto" : "none"}
          />
        </AnimatedGroup>
      </Svg>
    </AbsoluteView>
  );
};
