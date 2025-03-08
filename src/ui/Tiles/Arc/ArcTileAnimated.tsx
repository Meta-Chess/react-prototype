import React, { FC } from "react";
import { Svg } from "react-native-svg";
import type { AnimatedTileProps } from "../TileProps";
import { AnimatedGroup } from "primitives";
import { AbsoluteView } from "ui/Containers";
import { SVG_TILE_WORKING_AREA } from "..";
import { PathWithNoOutline } from "primitives/OutlinelessComponents";

export const ArcTileAnimated: FC<AnimatedTileProps> = ({
  tileSchematic,
  color,
  pressable,
}) => {
  const svgDetails = tileSchematic?.arcSvgDetails;
  if (svgDetails === undefined) return <></>;

  return (
    <AbsoluteView pointerEvents={"none"}>
      <Svg
        viewBox={`0 0 ${SVG_TILE_WORKING_AREA} ${SVG_TILE_WORKING_AREA}`}
        pointerEvents={"none"}
      >
        <AnimatedGroup stroke={color} pointerEvents={"none"}>
          <PathWithNoOutline
            d={svgDetails.tilePath}
            fill={"none"}
            strokeWidth={svgDetails.tileWidth}
            pointerEvents={pressable ? "auto" : "none"}
          />
        </AnimatedGroup>
      </Svg>
    </AbsoluteView>
  );
};
