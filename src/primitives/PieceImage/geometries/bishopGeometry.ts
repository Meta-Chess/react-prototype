import { LatheGeometry, Vector2 } from "three";
import { bishopBase } from "./parts";

const bishopPoints = [...bishopBase];
for (let i = 4; i < 21; i++) {
  bishopPoints.push(
    new Vector2(
      0.035 * Math.sin((i * Math.PI) / 20),
      0.2 - 0.05 * Math.cos((i * Math.PI) / 20)
    )
  );
}
for (let i = 0; i < 21; i++) {
  bishopPoints.push(
    new Vector2(
      0.014 * Math.sin((i * Math.PI) / 20),
      0.25 - 0.014 * Math.cos((i * Math.PI) / 20)
    )
  );
}

export const bishopGeometry = new LatheGeometry(bishopPoints, 20);
