import React, { FC } from "react";
import { Colors } from "primitives";
import { Circle } from "react-native-svg";

interface Props {
  cx: number;
  cy: number;
  fillColor: string | undefined;
}

const TraitNode: FC<Props> = ({ fillColor, cx, cy }) => {
  return fillColor === undefined ? (
    <>
      <Circle cx={cx} cy={cy} r={0.4} fill={Colors.DARKEST.toString()} />
    </>
  ) : (
    <>
      <Circle
        cx={cx}
        cy={cy}
        r={0.4}
        stroke={Colors.DARKEST.toString()}
        strokeWidth={0.15}
        fill={fillColor}
      />
    </>
  );
};

export { TraitNode };
