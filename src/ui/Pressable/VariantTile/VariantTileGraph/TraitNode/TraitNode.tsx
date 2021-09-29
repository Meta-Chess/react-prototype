import React, { FC } from "react";
import { Colors } from "primitives";
import { Circle } from "react-native-svg";
import { TraitHalfNode } from "./TraitHalfNode";

interface Props {
  order: number;
  cx: number;
  cy: number;
  fillColor: string | undefined;
  secondFillColor: string | undefined;
}

const TraitNode: FC<Props> = ({ order, fillColor, secondFillColor, cx, cy }) => {
  const uniqueClipId = order.toString();
  return fillColor === undefined ? (
    <>
      <Circle cx={cx} cy={cy} r={0.4} fill={Colors.DARKEST.toString()} />
    </>
  ) : (
    <>
      <Circle cx={cx} cy={cy} r={0.475} fill={Colors.DARKEST.toString()} />
      {secondFillColor ? (
        <TraitHalfNode
          leftSide={true}
          uniqueClipId={uniqueClipId}
          cx={cx}
          cy={cy}
          color={fillColor}
        />
      ) : (
        <Circle cx={cx} cy={cy} r={0.325} fill={fillColor} />
      )}
      {secondFillColor && (
        <TraitHalfNode
          leftSide={false}
          uniqueClipId={uniqueClipId + "2"}
          cx={cx}
          cy={cy}
          color={secondFillColor}
        />
      )}
    </>
  );
};

export { TraitNode };
