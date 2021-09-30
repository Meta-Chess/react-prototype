import React from "react";
import { SFC } from "primitives";
import { ArcTile } from "ui/Tiles/Arc";
import { TilePressable } from "./TilePressable";

import type { TilePressableProps } from "./TilePressableProps";

export const ArcTilePressable: SFC<TilePressableProps> = ({
  tileSchematic,
  color,
  onPress,
  children,
}) => {
  return (
    <TilePressable color={color} onPress={onPress} tileSchematic={tileSchematic}>
      <ArcTile tileSchematic={tileSchematic} color={color} pressable={true}>
        {children}
      </ArcTile>
    </TilePressable>
  );
};
