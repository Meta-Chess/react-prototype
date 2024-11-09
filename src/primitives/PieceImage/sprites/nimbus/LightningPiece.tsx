import React, { FC } from "react";
import { Path } from "react-native-svg";

const LightningPiece: FC = () => {
  return (
    <>
      <Path
        d="M50 150 L0 100 L50 20 L100 100 Z"
        strokeWidth={4}
        scale={0.25}
        translate={[10, 3]}
        transform="rotate(180, 50, 75)"
      />
      <Path
        d="M369.533,177.027h-67.716L367.744,0h-218.25l-37.056,288.551h73.68l-32.431,208.975
          c-0.899,5.808,2.342,11.453,7.805,13.606c5.472,2.144,11.686,0.216,14.98-4.642l223.09-329.462H369.533z M198.384,417.302
          l24.92-160.612h-74.649l28.879-224.828h144.344l-65.926,177.027h83.56L198.384,417.302z"
        scale={0.03}
        translate={[15.5, 19]}
        strokeWidth={4}
        stroke="#DD22DD"
        fill="#DD22DD"
      />
    </>
  );
};

export { LightningPiece };
