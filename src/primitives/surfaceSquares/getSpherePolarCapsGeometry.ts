import { BufferAttribute, BufferGeometry, Vector3 } from "three";
import { sphereProjection } from "./sphereProjection";

export function getSpherePolarCapsGeometry({
  numberOfFiles,
  numberOfRanks,
  fileGranularity,
}: {
  numberOfFiles: number;
  numberOfRanks: number;
  fileGranularity: number;
}): BufferGeometry {
  const pointCount = numberOfFiles * fileGranularity;
  const vertices = [0, 1, 0, 0, -1, 0];
  let vector: Vector3;
  for (let i = 0; i < pointCount; i++) {
    vector = sphereProjection({
      file: i / fileGranularity,
      rank: 0,
      numberOfFiles,
      numberOfRanks,
    }).position;
    vertices.push(vector.x, vector.y, vector.z);
  }
  for (let i = 0; i < pointCount; i++) {
    vector = sphereProjection({
      rank: i / fileGranularity,
      file: numberOfRanks + 1,
      numberOfFiles,
      numberOfRanks,
    }).position;
    vertices.push(vector.x, vector.y, vector.z);
  }

  // Each set of three vertex indices determines a triangular face and its orientation
  const indices = [];
  for (let i = 0; i < pointCount; i++) {
    indices.push(0, i + 2, ((i + 1) % pointCount) + 2);
    indices.push(1, ((i + 1) % pointCount) + 2 + pointCount, i + 2 + pointCount);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(vertices), 3));
  geometry.setAttribute("normal", new BufferAttribute(new Float32Array(vertices), 3)); // this is special for spheres
  geometry.setIndex(indices);

  return geometry;
}
