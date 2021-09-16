import { View } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";

export const Divider = styled(View)`
  border-top-width: 1px;
  border-top-color: ${Colors.DARKISH.fade(0.5).toString()};
  padding: 16px;
  flex-direction: row;
`;
