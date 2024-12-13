import React, { FC } from "react";
import { Svg, G } from "react-native-svg";
import { AbsoluteView } from "ui/Containers";
import { PathWithNoOutline } from "primitives/OutlinelessComponents";
import type { TileProps } from "../TileProps";
import { ARC_TILE_WORKING_AREA } from "../Arc/describeArcTile";

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
        <G
          translate={[
            tileSchematic?.scale ? tileSchematic?.leftAdjustmentToTileCenterSvg || 0 : 0,
            tileSchematic?.scale ? tileSchematic?.topAdjustmentToTileCenterSvg || 0 : 0,
          ]}
        >
          <G scale={tileSchematic?.scale}>
            <G
              translate={[
                tileSchematic?.scale
                  ? -1 * (tileSchematic?.leftAdjustmentToTileCenterSvg || 0)
                  : 0,
                tileSchematic?.scale
                  ? -1 * (tileSchematic?.topAdjustmentToTileCenterSvg || 0)
                  : 0,
              ]}
            >
              <PathWithNoOutline
                d={tileSchematic?.arcSvgDetails.tilePath}
                fill={color.toString()}
                stroke="none"
                strokeWidth={0.5}
                pointerEvents={pressable ? "auto" : "none"}
              />
            </G>
          </G>
        </G>
      </Svg>
    </AbsoluteView>
  );
};
