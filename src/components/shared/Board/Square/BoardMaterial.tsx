import Color from "color";
import React, { FC } from "react";

export const BoardMaterial: FC<{ color: Color }> = ({ color }) => (
  <meshStandardMaterial
    attach="material"
    color={color.alpha(1).toString()}
    roughness={0.5}
    metalness={0.2}
    transparent={true}
    opacity={color.alpha()}
  />
);
