import { BufferAttribute, BufferGeometry, Vector3 } from "three";

export function getMercatorSquareGeometry(
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
        ...rankFileToSphereCoords(
          x + i / xGranularity,
          y + j / yGranularity,
          xCount,
          yCount
        )
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

export function getCapCirclesGeometry(
  xCount: number,
  yCount: number,
  xGranularity: number
): BufferGeometry {
  const pointCount = xCount * xGranularity;
  const vertices = [0, 1, 0, 0, -1, 0];
  for (let i = 0; i < pointCount; i++) {
    vertices.push(...rankFileToSphereCoords(i / xGranularity, 0, xCount, yCount));
  }
  for (let i = 0; i < pointCount; i++) {
    vertices.push(
      ...rankFileToSphereCoords(i / xGranularity, yCount + 1, xCount, yCount)
    );
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

export function rankFileToSphereCoords(
  x: number,
  y: number,
  xCount: number,
  yCount: number
): [number, number, number] {
  const vector = new Vector3().setFromSphericalCoords(
    1,
    ((y - 0.5) * Math.PI) / (yCount + 1), // the +1 is to leave room at the poles
    (x * 2 * Math.PI) / xCount
  );
  return [vector.x, vector.y, vector.z];
}
