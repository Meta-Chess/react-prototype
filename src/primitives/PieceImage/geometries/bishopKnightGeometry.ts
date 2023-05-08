import { LatheGeometry } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import {
  bishopBase,
  horseNeckAndHead,
  buildShape,
  buildBeveledExtrudedGeometry,
  getMinOrMaxY,
} from "./shared";

const bishopBaseGeometry = new LatheGeometry(bishopBase, 20).toNonIndexed();

const horseMinY = getMinOrMaxY(horseNeckAndHead, "min");
const bishopMaxY = getMinOrMaxY(bishopBase, "max");
const horseOffset = bishopMaxY - horseMinY;

const horseShape = buildShape(horseNeckAndHead);
const horseGeometry = buildBeveledExtrudedGeometry(horseShape)
  .scale(0.8, 0.8, 0.8)
  .translate(0, horseOffset / 0.8, 0);

export const bishopKnightGeometry = mergeBufferGeometries(
  [bishopBaseGeometry, horseGeometry],
  false
);
