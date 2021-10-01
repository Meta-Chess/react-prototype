import React, { FC } from "react";
import { Circle, Rect, ClipPath } from "react-native-svg";

interface Props {
  uniqueClipId: string;
  leftSide: boolean;
  cx: number;
  cy: number;
  color: string;
}

const TraitHalfNode: FC<Props> = ({ uniqueClipId, leftSide, color, cx, cy }) => {
  return (
    <>
      <ClipPath id={uniqueClipId}>
        <Rect
          x={cx + (leftSide ? -(0.4 - 0.075) : 0.075 * 2)}
          y={0}
          width={0.4 - (leftSide ? 0.075 : 0)}
          height={1}
          fill={"white"}
        />
      </ClipPath>
      <Circle
        cx={cx}
        cy={cy}
        r={0.325}
        fill={color}
        clipPath={"url(#" + uniqueClipId + ")"}
      />{" "}
    </>
  );
};

export { TraitHalfNode };
