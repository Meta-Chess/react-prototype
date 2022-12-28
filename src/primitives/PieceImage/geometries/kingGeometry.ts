import { ExtrudeGeometry, LatheGeometry, Shape, Vector2 } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";

const lathePoints = [
  new Vector2(0, 0),
  new Vector2(0.1, 0),
  new Vector2(0.1, 0.03),
  new Vector2(0.08, 0.03),
  new Vector2(0.06, 0.1),
  new Vector2(0.04, 0.19),
  new Vector2(0.06, 0.19),
  new Vector2(0.06, 0.2),
  new Vector2(0.04, 0.2),
  new Vector2(0.06, 0.28),
  new Vector2(0.04, 0.29),
  new Vector2(0.02, 0.295),
  new Vector2(0, 0.297),
];
const latheGeometry = new LatheGeometry(lathePoints, 20).toNonIndexed();

const blockShape = new Shape();
blockShape.moveTo(0.01, 0.297);
blockShape.lineTo(0.01, 0.307);
blockShape.lineTo(-0.01, 0.307);
blockShape.lineTo(-0.01, 0.297);

const blockGeometry = new ExtrudeGeometry(blockShape, {
  depth: 0.02,
  bevelEnabled: true,
  bevelThickness: 0.002,
  bevelSize: 0.002,
  bevelOffset: 0,
  bevelSegments: 1,
}).translate(0, 0, -0.01);

export const kingGeometry = mergeBufferGeometries([latheGeometry, blockGeometry], false);
