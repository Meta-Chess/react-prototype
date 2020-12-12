import { View } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { Styles } from "primitives/Styles";

export const Card = styled(View)`
  background-color: ${Colors.DARK.toString()};
  ${Styles.BOX_SHADOW}
  border-radius: 4px;
  margin: 8px;
  padding: 16px;
`;
