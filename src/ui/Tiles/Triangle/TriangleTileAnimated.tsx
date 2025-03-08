import React, { FC } from "react";
import { Svg } from "react-native-svg";
import type { AnimatedTileProps } from "../TileProps";
import { AnimatedGroup } from "primitives";
import { AbsoluteView } from "ui/Containers";
import { ARC_TILE_WORKING_AREA } from "..";
import { PathWithNoOutline } from "primitives/OutlinelessComponents";

export const TriangleTileAnimated: FC<AnimatedTileProps> = ({
  tileSchematic,
  color,
  pressable,
}) => {
  const svgDetails = tileSchematic?.arcSvgDetails;
  if (svgDetails === undefined) return <></>;

  return (
    <AbsoluteView pointerEvents={"none"}>
      <Svg
        viewBox={`0 0 ${ARC_TILE_WORKING_AREA} ${ARC_TILE_WORKING_AREA}`}
        pointerEvents={"none"}
      >
        <AnimatedGroup fill={color} pointerEvents={"none"}>
          <PathWithNoOutline
            d={tileSchematic?.arcSvgDetails.tilePath}
            stroke={"none"}
            pointerEvents={pressable ? "auto" : "none"}
          />
        </AnimatedGroup>
      </Svg>
    </AbsoluteView>
  );
};
