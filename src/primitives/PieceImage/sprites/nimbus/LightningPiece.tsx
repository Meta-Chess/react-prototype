import React, { FC } from "react";
import { Svg, G, Polygon, Path } from "react-native-svg";

const LightningPiece: FC = () => {
  return (
    <>
      <Svg viewBox="0 0 1567 1547.42">
        <G scale={0.8} translate={[156.7, 140]}>
          <Polygon
            fill="#80179E"
            stroke="#000000"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="
		1373.89,1030.465 780.941,3.448 187.993,1030.465 780.941,1543.973 	"
          />

          <Path
            stroke="#FFFFFF"
            strokeWidth="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="
		M931.141,716.965l49.637-137.912L814.367,619.43l-30.474-493.534L510.022,940.895l111.43-27.05l-46.305,137.824l174.447-42.328
		l27.304,442.393l274.962-764.058L931.141,716.965z M818.814,915.504l-129.483,31.423l46.305-137.815l-111.428,27.033
		l108.578-323.107l12.364,200.229l118.065-28.641L813.58,822.534l120.717-29.284l-105.016,291.828L818.814,915.504z"
          />
        </G>
      </Svg>
    </>
  );
};

export { LightningPiece };
