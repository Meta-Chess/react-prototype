import { LatheGeometry, Vector2 } from "three";

const pawnPoints = [
  new Vector2(0, 0),
  new Vector2(0.1, 0),
  new Vector2(0.1, 0.03),
  new Vector2(0.06, 0.03),
  new Vector2(0.04, 0.09),
  new Vector2(0.03, 0.15),
  new Vector2(0.04, 0.15),
  new Vector2(0.04, 0.16),
  new Vector2(0.035, 0.16),
];
for (let i = 4; i < 21; i++) {
  pawnPoints.push(
    new Vector2(
      0.035 * Math.sin((i * Math.PI) / 20),
      0.2 - 0.05 * Math.cos((i * Math.PI) / 20)
    )
  );
}
for (let i = 0; i < 21; i++) {
  pawnPoints.push(
    new Vector2(
      0.01 * Math.sin((i * Math.PI) / 20),
      0.25 - 0.01 * Math.cos((i * Math.PI) / 20)
    )
  );
}
console.log(pawnPoints);

export const bishopGeometry = new LatheGeometry(pawnPoints, 20);