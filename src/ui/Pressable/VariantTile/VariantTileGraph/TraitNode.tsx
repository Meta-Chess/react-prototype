import React, { FC } from "react";
import { SFC, Text, Colors } from "primitives";
import { View } from "react-native";
import { FutureVariant } from "game";
import styled from "styled-components/native";
import { TraitName, traitInfo } from "game/variants/traitInfo";
import { LabelWithDetails } from "ui";
import { Svg, Circle, Line } from "react-native-svg";
import Color from "color";

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
