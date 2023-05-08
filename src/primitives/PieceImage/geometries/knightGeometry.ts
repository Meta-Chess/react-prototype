import { LatheGeometry, Vector2 } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { ShapePoints } from "./shared";
import { horseNeckAndHead, buildShape, buildBeveledExtrudedGeometry } from "./shared";

const horse = [
  ...horseNeckAndHead,
  { x: -0.045, y: 0.03 },
  { x: 0.055, y: 0.03 },
] as ShapePoints;
const horseShape = buildShape(horse);
const horseGeometry = buildBeveledExtrudedGeometry(horseShape);

const basePoints = [
  new Vector2(0, 0),
  new Vector2(0.09, 0),
  new Vector2(0.09, 0.03),
  new Vector2(0, 0.03),
];
const baseGeometry = new LatheGeometry(basePoints, 20).toNonIndexed();

export const knightGeometry = mergeBufferGeometries([horseGeometry, baseGeometry], false);
