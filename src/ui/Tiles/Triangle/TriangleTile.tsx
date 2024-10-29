import React, { FC } from "react";
import { Svg } from "react-native-svg";
import { AbsoluteView } from "ui/Containers";
import { ARC_TILE_WORKING_AREA } from ".";
import { PathWithNoOutline } from "primitives/OutlinelessComponents";
import type { TileProps } from "../TileProps";
import { View } from "react-native";

export const TriangleTile: FC<TileProps> = ({
  tileSchematic,
  color,
  pressable = false,
}) => {
  const svgDetails = tileSchematic?.arcSvgDetails;
  if (svgDetails === undefined) return <></>;

  return (
    <AbsoluteView pointerEvents={"none"}>
      <Svg
        viewBox={`0 0 ${ARC_TILE_WORKING_AREA} ${ARC_TILE_WORKING_AREA}`}
        pointerEvents={"none"}
      >
        <PathWithNoOutline
          d={tileSchematic?.arcSvgDetails.tilePath}
          fill={color.toString()}
          stroke="none"
          pointerEvents={pressable ? "auto" : "none"}
        />
      </Svg>
    </AbsoluteView>
  );
};
