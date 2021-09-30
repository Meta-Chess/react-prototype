import React, { FC } from "react";
import { View } from "react-native";
import { AbsoluteView } from "ui/Containers";
import type { SvgMeasurement } from "./CircularBoard";
import { SvgAnnulus } from "primitives/Shapes";
import styled from "styled-components/native";

interface Props {
  boardSizePixel: number;
  boardSize: SvgMeasurement;
  centerGapSize: SvgMeasurement;
  radialWidth: SvgMeasurement;
  shadowRadialWidth: SvgMeasurement;
  color: string;
  shadowColor: string;
}
export const CircularBackboard: FC<Props> = ({
  boardSizePixel,
  boardSize,
  centerGapSize,
  radialWidth,
  shadowRadialWidth,
  color,
  shadowColor,
}) => {
  const totalRadialWidth = radialWidth + shadowRadialWidth;
  return (
    <AbsoluteView
      style={{ justifyContent: "center", alignItems: "center" }}
      pointerEvents={"none"}
    >
      <View
        style={{ width: boardSizePixel, height: boardSizePixel }}
        pointerEvents={"none"}
      >
        <InnerAnnulus
          WorkingLength={boardSize}
          OuterRadius={centerGapSize}
          InnerRadius={centerGapSize - radialWidth}
          color={color}
          uniqueMaskId={"InnerAnnulus"}
        />
        <InnerAnnulusShadow
          WorkingLength={boardSize}
          OuterRadius={centerGapSize - radialWidth}
          InnerRadius={centerGapSize - totalRadialWidth}
          color={shadowColor}
          uniqueMaskId={"InnerAnnulusShadow"}
        />
      </View>
      <OuterAnnulus
        WorkingLength={boardSize + 2 * totalRadialWidth}
        OuterRadius={boardSize / 2 + radialWidth}
        InnerRadius={boardSize / 2}
        color={color}
        uniqueMaskId={"OuterAnnulus"}
      />
      <OuterAnnulusShadow
        WorkingLength={boardSize + 2 * totalRadialWidth}
        OuterRadius={boardSize / 2 + totalRadialWidth}
        InnerRadius={boardSize / 2 + radialWidth}
        color={shadowColor}
        uniqueMaskId={"OuterAnnulusShadow"}
      />
    </AbsoluteView>
  );
};

const InnerAnnulus = styled(SvgAnnulus)``;
const InnerAnnulusShadow = styled(SvgAnnulus)``;
const OuterAnnulus = styled(SvgAnnulus)``;
const OuterAnnulusShadow = styled(SvgAnnulus)``;
