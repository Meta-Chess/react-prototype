import { LatheGeometry, Vector2 } from "three";

const pawnPoints = [
  new Vector2(0, 0),
  new Vector2(0.075, 0),
  new Vector2(0.075, 0.03),
  new Vector2(0.05, 0.03),
  new Vector2(0.03, 0.05),
  new Vector2(0.02, 0.1),
  new Vector2(0.032, 0.1),
  new Vector2(0.032, 0.107),
  new Vector2(0.01, 0.107),
];
for (let i = 4; i < 21; i++) {
  pawnPoints.push(
    new Vector2(
      0.032 * Math.sin((i * Math.PI) / 20),
      0.127 - 0.032 * Math.cos((i * Math.PI) / 20)
    )
  );
}

export const pawnGeometry = new LatheGeometry(pawnPoints, 20);
