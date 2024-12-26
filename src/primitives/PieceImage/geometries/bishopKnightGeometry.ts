import { LatheGeometry } from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import { bishopBase, horseNeckAndHead } from "./parts";
import { buildShape, buildBeveledExtrudedGeometry, getMinOrMaxY } from "./utilities";

const bishopBaseGeometry = new LatheGeometry(bishopBase, 20).toNonIndexed();

const horseMinY = getMinOrMaxY(horseNeckAndHead, "min");
const bishopMaxY = getMinOrMaxY(bishopBase, "max");
const horseOffset = bishopMaxY - horseMinY;

const horseShape = buildShape(horseNeckAndHead);
const horseGeometry = buildBeveledExtrudedGeometry(horseShape)
  .scale(0.8, 0.8, 0.8)
  .translate(0, horseOffset / 0.8, 0);

export const bishopKnightGeometry = mergeGeometries(
  [bishopBaseGeometry, horseGeometry],
  false
);
