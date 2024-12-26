import { ExtrudeGeometry, LatheGeometry, Shape, Vector2 } from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";

const lathePoints = [
  new Vector2(0, 0),
  new Vector2(0.09, 0),
  new Vector2(0.09, 0.03),
  new Vector2(0.06, 0.03),
  new Vector2(0.05, 0.1),
  new Vector2(0.03, 0.19),
  new Vector2(0.045, 0.19),
  new Vector2(0.045, 0.2),
  new Vector2(0.03, 0.2),
  new Vector2(0.05, 0.28),
  new Vector2(0.03, 0.29),
  new Vector2(0.01, 0.295),
  new Vector2(0, 0.297),
];
const latheGeometry = new LatheGeometry(lathePoints, 20).toNonIndexed();

const blockShape = new Shape();
blockShape.moveTo(0.005, 0.29);
blockShape.lineTo(0.005, 0.31);
blockShape.lineTo(0.02, 0.31);
blockShape.lineTo(0.02, 0.32);
blockShape.lineTo(0.005, 0.32);
blockShape.lineTo(0.005, 0.335);
blockShape.lineTo(-0.005, 0.335);
blockShape.lineTo(-0.005, 0.32);
blockShape.lineTo(-0.02, 0.32);
blockShape.lineTo(-0.02, 0.31);
blockShape.lineTo(-0.005, 0.31);
blockShape.lineTo(-0.005, 0.29);

const blockGeometry = new ExtrudeGeometry(blockShape, {
  depth: 0.02,
  bevelEnabled: true,
  bevelThickness: 0.002,
  bevelSize: 0.002,
  bevelOffset: 0,
  bevelSegments: 1,
}).translate(0, 0, -0.01);

export const kingGeometry = mergeGeometries([latheGeometry, blockGeometry], false);
