import { rankFileToSphereCoords } from "primitives/Shapes";
import { BufferAttribute, BufferGeometry } from "three";

export function getSpherePolarCapsGeometry(
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
