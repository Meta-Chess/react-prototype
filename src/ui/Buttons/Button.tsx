import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";

interface Props {
  text: string;
  onPress: () => void;
}

export const Button: SFC<Props> = ({ style, text, onPress }) => {
  return (
    <BaseButton onPress={onPress} style={style} accessibilityRole={"button"}>
      <Text cat="DisplayL" weight="heavy" color={Colors.TEXT.DARK.toString()}>
        {text}
      </Text>
    </BaseButton>
  );
};

// TODO: This should probably be a button underneath for accessibility reasons
const BaseButton = styled(TouchableOpacity)`
  padding: 12px 32px;
  min-height: 40px;
  background-color: ${Colors.MCHESS.string()};
  border-radius: 50px;
  box-shadow: 0px 1px 4px ${Colors.BLACK.fade(0.5).string()};
  align-items: center;
`;
