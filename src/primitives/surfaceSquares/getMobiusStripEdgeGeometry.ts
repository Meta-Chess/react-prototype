import { BufferAttribute, BufferGeometry, Vector3 } from "three";
import { mobiusEdgeNormal, mobiusInverseProjection } from "./mobiusInverseProjection";

export function getMobiusStripEdgeGeometry({
  numberOfRanks,
  rankGranularity,
}: {
  numberOfRanks: number;
  rankGranularity: number;
}): BufferGeometry {
  const pointCount = 2 * numberOfRanks * rankGranularity;
  const vertices = [];
  const normals = [];
  let vector: Vector3;
  for (let i = 0; i < pointCount / 2; i++) {
    // Add two vertices and their normals that are at the edges of opposite faces of the strip
    vector = mobiusInverseProjection({
      file: 1,
      rank: i / rankGranularity,
      numberOfFiles: 1,
      numberOfRanks,
    }).position;
    vertices.push(vector.x, vector.y, vector.z);
    vector = mobiusEdgeNormal({ rank: i / rankGranularity, numberOfRanks });
    normals.push(vector.x, vector.y, vector.z);

    vector = mobiusInverseProjection({
      file: 2,
      rank: i / rankGranularity + numberOfRanks / 2,
      numberOfFiles: 1,
      numberOfRanks,
    }).position;
    vertices.push(vector.x, vector.y, vector.z);
    vector = mobiusEdgeNormal({
      rank: i / rankGranularity + numberOfRanks / 2,
      numberOfRanks,
    });
    normals.push(vector.x, vector.y, vector.z);
  }

  // Each set of three vertex indices determines a triangular face and its orientation
  const indices = [];
  for (let i = 0; i < pointCount; i += 2) {
    indices.push(i, (i + 1) % pointCount, (i + 2) % pointCount);
    indices.push((i + 2) % pointCount, (i + 1) % pointCount, (i + 3) % pointCount);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(vertices), 3));
  geometry.setAttribute("normal", new BufferAttribute(new Float32Array(normals), 3));
  geometry.setIndex(indices);

  return geometry;
}
