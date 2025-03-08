import React, { FC } from "react";
import { Svg, G } from "react-native-svg";
import { AbsoluteView } from "ui/Containers";
import { PathWithNoOutline } from "primitives/OutlinelessComponents";
import type { TileProps } from "../TileProps";
import { SVG_TILE_WORKING_AREA } from "..";

export const TriangleTile: FC<TileProps> = ({
  tileSchematic,
  color,
  pressable = false,
}) => {
  const svgDetails = tileSchematic?.arcSvgDetails;
  if (svgDetails === undefined) return <></>;

  const scaleTransform = tileSchematic?.scale
    ? `translate(
    ${tileSchematic?.leftAdjustmentToTileCenter || 0}, 
    ${tileSchematic?.topAdjustmentToTileCenter || 0}
  ) scale(${tileSchematic?.scale}) translate(
    ${-1 * (tileSchematic?.leftAdjustmentToTileCenter || 0)}, 
    ${-1 * (tileSchematic?.topAdjustmentToTileCenter || 0)}
  )`
    : "";
  return (
    <AbsoluteView pointerEvents={"none"}>
      <Svg
        viewBox={`0 0 ${SVG_TILE_WORKING_AREA} ${SVG_TILE_WORKING_AREA}`}
        pointerEvents={"none"}
      >
        <G transform={scaleTransform}>
          <PathWithNoOutline
            d={tileSchematic?.arcSvgDetails.tilePath}
            fill={color.toString()}
            stroke={"none"}
            strokeWidth={1}
            pointerEvents={pressable ? "auto" : "none"}
          />
        </G>
      </Svg>
    </AbsoluteView>
  );
};
