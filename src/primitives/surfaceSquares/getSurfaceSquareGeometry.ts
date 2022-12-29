import { BufferAttribute, BufferGeometry } from "three";

export function getSurfaceSquareGeometry(
  projection: (
    x: number,
    y: number,
    xCount: number,
    yCount: number
  ) => [number, number, number],
  x: number,
  y: number,
  xCount: number,
  yCount: number,
  xGranularity: number,
  yGranularity: number
): BufferGeometry {
  const vertices = [];
  for (let j = 0; j <= yGranularity; j++) {
    for (let i = 0; i <= xGranularity; i++) {
      vertices.push(
        ...projection(x + i / xGranularity, y + j / yGranularity, xCount, yCount)
      );
    }
  }

  // Each set of three vertex indices determines a triangular face and its orientation
  const indices = [];
  for (let i = 0; i < xGranularity; i++) {
    for (let j = 0; j < yGranularity; j++) {
      const [a, b, c, d] = [
        i + j * (xGranularity + 1),
        i + 1 + j * (xGranularity + 1),
        i + (j + 1) * (xGranularity + 1),
        i + 1 + (j + 1) * (xGranularity + 1),
      ];
      indices.push(a, c, b); // top left triangle
      indices.push(d, b, c); // bottom right triangle
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(vertices), 3));
  geometry.setAttribute("normal", new BufferAttribute(new Float32Array(vertices), 3)); // this is special for spheres
  geometry.setIndex(indices);

  return geometry;
}
