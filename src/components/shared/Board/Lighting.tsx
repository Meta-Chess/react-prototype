import React, { FC } from "react";
import { Colors } from "primitives";

export const Lighting: FC = () => {
  // general glow plus three slightly different-warmth lights around the equator
  return (
    <>
      {/* @ts-ignore */}
      <ambientLight intensity={0.45} />
      {/* @ts-ignore */}
      <directionalLight
        position={[0, 0, 20]}
        color={Colors.LIGHTING.WARM.toString()}
        castShadow={true}
      />
      {/* @ts-ignore */}
      <directionalLight
        position={[17, 0, -10]}
        color={Colors.LIGHTING.COLD.toString()}
        castShadow={true}
      />
      {/* @ts-ignore */}
      <directionalLight
        position={[-17, 0, -10]}
        color={Colors.LIGHTING.NEUTRAL.toString()}
        castShadow={true}
      />
      {/* @ts-ignore */}
      <pointLight
        position={[0, 0, 0]}
        color={Colors.LIGHTING.WARM.mix(Colors.LIGHTING.NEUTRAL, 0.5).toString()}
        castShadow={true}
        intensity={0.2}
      />
    </>
  );
};
