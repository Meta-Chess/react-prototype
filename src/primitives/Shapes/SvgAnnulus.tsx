import React, { FC } from "react";
import { AbsoluteView } from "ui/Containers";
import { Svg, Mask, Rect, Circle } from "react-native-svg";

interface Props {
  WorkingLength: number;
  OuterRadius: number;
  InnerRadius: number;
  color: string;
  uniqueMaskId: string;
}
export const SvgAnnulus: FC<Props> = ({
  WorkingLength,
  OuterRadius,
  InnerRadius,
  color,
  uniqueMaskId,
}) => {
  return (
    <AbsoluteView pointerEvents={"none"}>
      <Svg viewBox={`0 0 ${WorkingLength} ${WorkingLength}`} pointerEvents={"none"}>
        <Mask id={uniqueMaskId}>
          <Rect width={WorkingLength} height={WorkingLength} fill={"white"} />
          <Circle
            cx={WorkingLength / 2}
            cy={WorkingLength / 2}
            r={InnerRadius}
            fill={"black"}
          />
        </Mask>
        <Circle
          r={OuterRadius}
          cx={WorkingLength / 2}
          cy={WorkingLength / 2}
          fill={color}
          mask={"url(#" + uniqueMaskId + ")"}
        />
      </Svg>
    </AbsoluteView>
  );
};
