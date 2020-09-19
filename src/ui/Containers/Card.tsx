import { View } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";

export const Card = styled(View)`
  background-color: ${Colors.DARK.toString()};
  box-shadow: 0px 1px 4px ${Colors.BLACK.fade(0.3).string()};
  border-radius: 4px;
  margin: 8px;
  padding: 16px;
`;
