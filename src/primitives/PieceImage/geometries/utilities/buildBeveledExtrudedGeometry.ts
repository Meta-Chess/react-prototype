import { Shape, ExtrudeGeometry } from "three";
import type { BufferGeometry } from "three";

export function buildBeveledExtrudedGeometry(shape: Shape): BufferGeometry {
  return new ExtrudeGeometry(shape, {
    steps: 2,
    depth: 0.03,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  }).translate(0, 0.01, -0.015);
}
