import { MeshProps } from "@react-three/fiber";
import { FC } from "react";

// This file exists purely to hide the fact that typescript doesn't know about the
// globally available `mesh` from react-three-fiber by explicitly exporting it

// @ts-ignore
const RawComponent = mesh;
const TypedComponent = RawComponent as FC<MeshProps>;

export { TypedComponent as Mesh };
