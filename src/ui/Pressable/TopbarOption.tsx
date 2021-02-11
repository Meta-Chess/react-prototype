import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";

interface Props {
  active: boolean;
  onPress: () => void;
}

export const TopbarOption: SFC<Props> = ({ active, onPress, children }) => {
  return (
    <TouchableContainer active={active} onPress={onPress}>
      {children}
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)<{ active: boolean }>`
  height: 28;
  width: 28;
  justify-content: center;
  align-items: center;
  margin-right: 8;
  background-color: ${({ active }): string =>
    active ? Colors.GREY.fade(0.6).toString() : Colors.GREY.fade(0.9).toString()};
  border-radius: 4;
  border-width: ${({ active }): number => (active ? 1 : 0)};
  border-color: ${Colors.TEXT.LIGHT_SECONDARY.toString()};
`;
