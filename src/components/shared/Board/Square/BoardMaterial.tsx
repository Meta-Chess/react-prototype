import Color from "color";
import React, { FC } from "react";

export const BoardMaterial: FC<{ color: Color }> = ({ color }) => (
  // @ts-ignore
  <meshStandardMaterial
    attach="material"
    color={color.toString()}
    roughness={0.5}
    metalness={0.2}
    transparent={true}
    opacity={color.alpha()}
  />
);
