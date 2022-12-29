import { BufferAttribute, BufferGeometry } from "three";

export function getSurfaceSquareGeometry(
  projection: Projection,
  file: number,
  rank: number,
  numberOfFiles: number,
  numberOfRanks: number,
  fileGranularity: number,
  rankGranularity: number
): BufferGeometry {
  const vertices = [];
  const normals = [];
  for (let j = 0; j <= rankGranularity; j++) {
    for (let i = 0; i <= fileGranularity; i++) {
      const { position, normal } = projection({
        file: file + i / fileGranularity,
        rank: rank + j / rankGranularity,
        numberOfFiles,
        numberOfRanks,
      });
      vertices.push(...position);
      normals.push(...normal);
    }
  }

  // Each set of three vertex indices determines a triangular face and its orientation
  const indices = [];
  for (let i = 0; i < fileGranularity; i++) {
    for (let j = 0; j < rankGranularity; j++) {
      const [a, b, c, d] = [
        i + j * (fileGranularity + 1),
        i + 1 + j * (fileGranularity + 1),
        i + (j + 1) * (fileGranularity + 1),
        i + 1 + (j + 1) * (fileGranularity + 1),
      ];
      indices.push(a, c, b); // top left triangle
      indices.push(d, b, c); // bottom right triangle
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(vertices), 3));
  geometry.setAttribute("normal", new BufferAttribute(new Float32Array(normals), 3));
  geometry.setIndex(indices);

  return geometry;
}
