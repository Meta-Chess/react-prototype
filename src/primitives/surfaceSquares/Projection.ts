import { Vector3 } from "three";

export type Projection = (boardCoordinates: {
  file: number;
  rank: number;
  numberOfFiles: number;
  numberOfRanks: number;
  heightAdjustment?: number;
}) => { position: Vector3; normal: Vector3 };
