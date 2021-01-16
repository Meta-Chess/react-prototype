import { TouchableOpacity } from "react-native";
import React from "react";
import { Colors, SFC, useHover } from "primitives";
import styled from "styled-components/native";

interface Props {
  onPress?: () => void;
}

export const ListItem: SFC<Props> = ({ onPress, children, style }) => {
  const [ref, hovered] = useHover();
  return (
    <Container
      onPress={onPress}
      style={style}
      ref={ref}
      hovered={!!onPress && hovered}
      disabled={!onPress}
    >
      {children}
    </Container>
  );
};

const Container = styled(TouchableOpacity)<{ hovered: boolean }>`
  background-color: ${({ hovered }): string =>
    hovered ? Colors.DARKEST.fade(0.8).toString() : "transparent"};
  flex-direction: row;
  min-height: 40px;
  padding: 12px;
`;
