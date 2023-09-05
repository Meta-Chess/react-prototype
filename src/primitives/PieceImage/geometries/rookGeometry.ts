import { LatheGeometry } from "three";
import { rook } from "./parts";

export const rookGeometry = new LatheGeometry(rook.points, 20);
