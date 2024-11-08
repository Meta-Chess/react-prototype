import React, { FC } from "react";
import { Path } from "react-native-svg";

const EarthPiece: FC = () => {
  return (
    <>
      <Path
        d="M50 150 L0 100 L50 20 L100 100 Z"
        fill="#D3D3D3" // Light Grey Fill
        stroke="#000000" // Black Outline
        strokeWidth={4}
        scale={0.25}
        translate={[10, 3]}
        transform="rotate(180, 50, 75)"
      />
      <Path
        d="M4.44893 17.009C-0.246384 7.83762 7.34051 0.686125 19.5546 3.61245C20.416 3.81881 21.0081 4.60984 20.965 5.49452C20.5862 13.288 17.0341 17.7048 6.13252 17.9857C5.43022 18.0038 4.76908 17.6344 4.44893 17.009Z"
        scale={0.6}
        translate={[16, 20]}
        fillOpacity={0}
        strokeWidth="2"
        stroke="#0C9C5B"
      />
      <Path
        d="M3.99999 21C5.50005 15.5 6 12.5 12 9.99997"
        scale={0.6}
        translate={[16, 20]}
        stroke="#0C9C5B"
        fillOpacity={0}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
};

export { EarthPiece };
