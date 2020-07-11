import React, { FC } from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components";

interface Props {
  text: string;
  onPress: () => void;
}

export const Button: FC<Props> = ({ text, onPress }) => {
  return (
    <BaseButton onPress={onPress}>
      <Text style={{ color: "#e4e0d3", fontWeight: "600" }}>{text}</Text>
    </BaseButton>
  );
};

const BaseButton = styled(TouchableOpacity)`
  padding: 12px 32px;
  background-color: #41787c;
  border: 2px #e4e0d3;
  border-radius: 50px;
`;
