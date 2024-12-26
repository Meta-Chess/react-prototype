import { LatheGeometry } from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import { rook, horseNeckAndHead } from "./parts";
import { buildShape, buildBeveledExtrudedGeometry, getMinOrMaxY } from "./utilities";

const rookGeometry = new LatheGeometry(rook.points, 20).toNonIndexed();

const horseMinY = getMinOrMaxY(horseNeckAndHead, "min");
const horseOffset = rook.features.flatTopYPosition - horseMinY;

const horseShape = buildShape(horseNeckAndHead);
const horseGeometry = buildBeveledExtrudedGeometry(horseShape)
  .scale(0.8, 0.8, 0.8)
  .translate(0, horseOffset / 0.8, 0);

export const rookKnightGeometry = mergeGeometries([rookGeometry, horseGeometry], false);
