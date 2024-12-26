import React from "react";
import { MeshProps } from "@react-three/fiber";
import { FC } from "react";

// This file exists purely to hide the fact that typescript doesn't know about the
// globally available `mesh` from react-three-fiber by explicitly exporting it

// @ts-ignore
const RawComponent = (props) => <mesh {...props} />;
export const Mesh = RawComponent as FC<MeshProps>;
