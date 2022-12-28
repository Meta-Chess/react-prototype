import { ExtrudeGeometry, LatheGeometry, Shape, Vector2 } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// TODO: try a smoother shape?
const horseShape = new Shape();
horseShape.moveTo(0.07, 0.03);
horseShape.lineTo(0.06, 0.08);
horseShape.lineTo(0.08, 0.16);
horseShape.lineTo(0.035, 0.19);
horseShape.lineTo(0.03, 0.215);
horseShape.lineTo(0.025, 0.19);
horseShape.lineTo(-0.09, 0.17);
horseShape.lineTo(-0.09, 0.15);
horseShape.lineTo(-0.02, 0.15);
horseShape.lineTo(-0.08, 0.08);
horseShape.lineTo(-0.07, 0.03);
const horseGeometry = new ExtrudeGeometry(horseShape, {
  steps: 2,
  depth: 0.05,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 1,
}).translate(0, 0, -0.025);

const basePoints = [
  new Vector2(0, 0),
  new Vector2(0.1, 0),
  new Vector2(0.1, 0.03),
  new Vector2(0, 0.03),
];
const baseGeometry = new LatheGeometry(basePoints, 20).toNonIndexed();

console.log(horseGeometry.index, baseGeometry.index);
export const knightGeometry = mergeBufferGeometries([horseGeometry, baseGeometry], false);
// export const knightGeometry = horseGeometry;
