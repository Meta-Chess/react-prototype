import { TileSchematic } from "ui/Tiles/TileProps";
import { ViewStyle } from "react-native";
import { StyleProps } from "primitives";

export const tileSchematicPositionViewProps = (
  tileSchematic: TileSchematic
): StyleProps<ViewStyle> => {
  return {
    position: "absolute",
    width: tileSchematic.centerMaxEmbeddedDiameter,
    height: tileSchematic.centerMaxEmbeddedDiameter,
    top:
      tileSchematic.topAdjustmentToTileCenter -
      tileSchematic.centerMaxEmbeddedDiameter / 2,
    left:
      tileSchematic.leftAdjustmentToTileCenter -
      tileSchematic.centerMaxEmbeddedDiameter / 2,
  };
};

export const tileSchematicPositionSvgProps = (
  tileSchematic: TileSchematic
): StyleProps<ViewStyle> => {
  return {
    width: tileSchematic.centerMaxEmbeddedDiameter,
    height: tileSchematic.centerMaxEmbeddedDiameter,
    top: tileSchematic.topAdjustmentToTileCenter,
    left: tileSchematic.leftAdjustmentToTileCenter,
  };
};
