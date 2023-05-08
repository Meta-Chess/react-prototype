import { LatheGeometry } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import {
  rook,
  horseNeckAndHead,
  buildShape,
  buildBeveledExtrudedGeometry,
  getMinOrMaxY,
} from "./shared";

const rookGeometry = new LatheGeometry(rook.points, 20).toNonIndexed();

const horseMinY = getMinOrMaxY(horseNeckAndHead, "min");
const horseOffset = rook.features.flatTopYPosition - horseMinY;

const horseShape = buildShape(horseNeckAndHead);
const horseGeometry = buildBeveledExtrudedGeometry(horseShape)
  .scale(0.8, 0.8, 0.8)
  .translate(0, horseOffset / 0.8, 0);

export const rookKnightGeometry = mergeBufferGeometries(
  [rookGeometry, horseGeometry],
  false
);
