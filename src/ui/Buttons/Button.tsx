import React from "react";
import { TouchableOpacity, Pressable } from "react-native";
import styled from "styled-components/native";
import { SFC, Text } from "primitives";

interface Props {
  text: string;
  onPress: () => void;
}

export const Button: SFC<Props> = ({ style, text, onPress }) => {
  return (
    <BaseButton onPress={onPress} style={style}>
      <Text.BodyM color="#e4e0d3" weight="heavy">
        {text}
      </Text.BodyM>
    </BaseButton>
  );
};

// TODO: This should probably be a button underneath for accessibility reasons
const BaseButton = styled(TouchableOpacity)`
  padding: 12px 32px;
  min-height: 40px;
  background-color: #41787c;
  border: 2px #e4e0d3;
  border-radius: 50px;
`;
