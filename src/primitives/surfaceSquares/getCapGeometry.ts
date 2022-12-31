import { BufferAttribute, BufferGeometry, Vector3 } from "three";
import { InverseProjection } from "primitives";

export function getCapGeometry({
  inverseProjection,
  numberOfFiles,
  numberOfRanks,
  fileGranularity,
  rankMinusOnePoint,
  rankMaxPlusOnePoint,
}: {
  inverseProjection: InverseProjection;
  numberOfFiles: number;
  numberOfRanks: number;
  fileGranularity: number;
  rankMinusOnePoint: [number, number, number];
  rankMaxPlusOnePoint: [number, number, number];
}): BufferGeometry {
  const pointCount = numberOfFiles * fileGranularity;
  const positions = [...rankMinusOnePoint, ...rankMaxPlusOnePoint];
  const normals = [...rankMinusOnePoint, ...rankMaxPlusOnePoint];
  let proj: { position: Vector3; normal: Vector3 };
  for (let i = 0; i < pointCount; i++) {
    proj = inverseProjection({
      file: i / fileGranularity,
      rank: 1,
      numberOfFiles,
      numberOfRanks,
    });
    positions.push(proj.position.x, proj.position.y, proj.position.z);
    normals.push(proj.normal.x, proj.normal.y, proj.normal.z);
  }
  for (let i = 0; i < pointCount; i++) {
    proj = inverseProjection({
      file: i / fileGranularity,
      rank: numberOfRanks + 1,
      numberOfFiles,
      numberOfRanks,
    });
    positions.push(proj.position.x, proj.position.y, proj.position.z);
    normals.push(proj.normal.x, proj.normal.y, proj.normal.z);
  }

  // Each set of three vertex indices determines a triangular face and its orientation
  const indices = [];
  for (let i = 0; i < pointCount; i++) {
    indices.push(0, i + 2, ((i + 1) % pointCount) + 2);
    indices.push(1, ((i + 1) % pointCount) + 2 + pointCount, i + 2 + pointCount);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute("normal", new BufferAttribute(new Float32Array(normals), 3));
  geometry.setIndex(indices);

  return geometry;
}
