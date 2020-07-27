import React from "react";
import { SFC } from "primitives";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

interface Props {
  text: string;
  onPress: () => void;
}

export const Button: SFC<Props> = ({ style, text, onPress }) => {
  return (
    <BaseButton onPress={onPress} style={style}>
      <Text style={{ color: "#e4e0d3", fontWeight: "600" }}>{text}</Text>
    </BaseButton>
  );
};

// TODO: This should probably be a button underneath for accessibility reasons
const BaseButton = styled(TouchableOpacity)`
  padding: 12px 32px;
  background-color: #41787c;
  border: 2px #e4e0d3;
  border-radius: 50px;
`;
