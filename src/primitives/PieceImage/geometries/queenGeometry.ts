import { LatheGeometry, Vector2 } from "three";

const pawnPoints = [
  new Vector2(0, 0),
  new Vector2(0.1, 0),
  new Vector2(0.1, 0.03),
  new Vector2(0.08, 0.03),
  new Vector2(0.06, 0.1),
  new Vector2(0.04, 0.19),
  new Vector2(0.06, 0.19),
  new Vector2(0.06, 0.2),
  new Vector2(0.04, 0.2),
  new Vector2(0.06, 0.28),
  new Vector2(0.04, 0.265),
];
for (let i = 10; i < 21; i++) {
  pawnPoints.push(
    new Vector2(
      0.04 * Math.sin((i * Math.PI) / 20),
      0.265 - 0.04 * Math.cos((i * Math.PI) / 20)
    )
  );
}
for (let i = 0; i < 21; i++) {
  pawnPoints.push(
    new Vector2(
      0.01 * Math.sin((i * Math.PI) / 20),
      0.305 - 0.01 * Math.cos((i * Math.PI) / 20)
    )
  );
}

export const queenGeometry = new LatheGeometry(pawnPoints, 20);
