import { LatheGeometry, Vector2 } from "three";

const pawnPoints = [
  new Vector2(0, 0),
  new Vector2(0.08, 0),
  new Vector2(0.08, 0.03),
  new Vector2(0.05, 0.03),
  new Vector2(0.03, 0.07),
  new Vector2(0.02, 0.12),
  new Vector2(0.04, 0.12),
  new Vector2(0.04, 0.127),
  new Vector2(0.035, 0.127),
];
for (let i = 4; i < 21; i++) {
  pawnPoints.push(
    new Vector2(
      0.035 * Math.sin((i * Math.PI) / 20),
      0.15 - 0.035 * Math.cos((i * Math.PI) / 20)
    )
  );
}

export const pawnGeometry = new LatheGeometry(pawnPoints, 20);
