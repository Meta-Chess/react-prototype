import { ExtrudeGeometry, LatheGeometry, Shape, Vector2 } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// TODO: try a smoother shape?
// TODO: work out how to get the Knights to face the right way
const horseShape = new Shape();
horseShape.moveTo(0.055, 0.03);
horseShape.lineTo(0.035, 0.08);
horseShape.lineTo(0.045, 0.16);
horseShape.lineTo(0.03, 0.19);
horseShape.lineTo(0.025, 0.215);
horseShape.lineTo(0.02, 0.19);
horseShape.lineTo(-0.065, 0.17);
horseShape.lineTo(-0.065, 0.155);
horseShape.lineTo(-0.005, 0.155);
horseShape.lineTo(-0.04, 0.08);
horseShape.lineTo(-0.045, 0.03);
const horseGeometry = new ExtrudeGeometry(horseShape, {
  steps: 2,
  depth: 0.03,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 3,
}).translate(0, 0, -0.015);

const basePoints = [
  new Vector2(0, 0),
  new Vector2(0.09, 0),
  new Vector2(0.09, 0.03),
  new Vector2(0, 0.03),
];
const baseGeometry = new LatheGeometry(basePoints, 20).toNonIndexed();

export const knightGeometry = mergeBufferGeometries([horseGeometry, baseGeometry], false);
