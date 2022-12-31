import { View } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { Styles } from "primitives/Styles";
import { BoardMeasurements } from "./calculateBoardMeasurements";

export const SquareBackboard = styled(View)<{
  backboard: boolean;
  measurements: BoardMeasurements;
}>`
  position: relative;
  ${({ backboard }): string => (backboard ? Styles.BOX_SHADOW_STRONG : "")}
  ${({ backboard }): string =>
    backboard ? `background-color: ${Colors.DARK.toString()}` : ""}
  height: ${({ measurements }): number => measurements.height}px;
  width: ${({ measurements }): number => measurements.width}px;
  padding-horizontal: ${({ measurements }): number =>
    measurements.boardPaddingHorizontal}px;
  padding-vertical: ${({ measurements }): number => measurements.boardPaddingVertical}px;
`;
