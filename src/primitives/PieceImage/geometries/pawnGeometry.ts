import { LatheGeometry, Vector2 } from "three";

const pawnPoints = [
  new Vector2(0, 0),
  new Vector2(0.1, 0),
  new Vector2(0.1, 0.03),
  new Vector2(0, 0.03),
];
for (let i = 0; i < 21; i++) {
  pawnPoints.push(
    new Vector2(
      0.08 * Math.sin((i * Math.PI) / 20),
      0.11 - 0.08 * Math.cos((i * Math.PI) / 20)
    )
  );
}

export const pawnGeometry = new LatheGeometry(pawnPoints, 20);
