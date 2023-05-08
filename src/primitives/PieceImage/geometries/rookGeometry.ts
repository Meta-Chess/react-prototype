import { LatheGeometry } from "three";
import { rook } from "./shared";

export const rookGeometry = new LatheGeometry(rook.points, 20);
