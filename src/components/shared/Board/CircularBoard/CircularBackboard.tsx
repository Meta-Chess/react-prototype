import React, { FC } from "react";
import { AbsoluteView } from "ui/Containers";
import type { SvgMeasurement } from "./CircularBoard";
import { SvgAnnulus } from "primitives/Shapes";
import styled from "styled-components/native";

interface Props {
  boardSize: SvgMeasurement;
  centerGapSize: SvgMeasurement;
  radialWidth: SvgMeasurement;
  shadowRadialWidth: SvgMeasurement;
  color: string;
  shadowColor: string;
}
export const CircularBackboard: FC<Props> = ({
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
      <AnnulusShadow
        WorkingLength={boardSize + 2 * totalRadialWidth}
        OuterRadius={boardSize / 2 + totalRadialWidth}
        InnerRadius={centerGapSize - totalRadialWidth}
        color={shadowColor}
        uniqueMaskId={"OuterAnnulusShadow"}
      />
      <Annulus
        WorkingLength={boardSize + 2 * totalRadialWidth}
        OuterRadius={boardSize / 2 + radialWidth}
        InnerRadius={centerGapSize - radialWidth}
        color={color}
        uniqueMaskId={"OuterAnnulus"}
      />
    </AbsoluteView>
  );
};

const Annulus = styled(SvgAnnulus)``;
const AnnulusShadow = styled(SvgAnnulus)``;
