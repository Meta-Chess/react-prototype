import React from "react";
import { SFC } from "primitives";
import { TriangleTile } from "ui/Tiles/Triangle";
import { TilePressable } from "./TilePressable";

import type { TilePressableProps } from "./TilePressableProps";

export const TriangleTilePressable: SFC<TilePressableProps> = ({
  tileSchematic,
  color,
  onPress,
  children,
}) => {
  return (
    <TilePressable color={color} onPress={onPress} tileSchematic={tileSchematic}>
      <TriangleTile tileSchematic={tileSchematic} color={color} pressable={true}>
        {children}
      </TriangleTile>
    </TilePressable>
  );
};
