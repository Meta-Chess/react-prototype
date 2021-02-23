import { View } from "react-native";
import styled from "styled-components/native";

export const HexBoardLayoutTile = styled(View)<{ size: number }>`
  height: ${({ size }): number => size};
  width: ${({ size }): number => size};
  margin-left: ${({ size }): number => -size / (8 * Math.sqrt(3))};
`;
