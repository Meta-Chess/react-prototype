import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
interface Props {
  title?: string;
}

export const Card: SFC<Props> = ({ title, children, style }) => {
  return (
    <Container style={style}>
      {title && <Text cat="DisplayM">{title}</Text>}
      {children}
    </Container>
  );
};

const Container = styled(View)`
  background-color: ${Colors.DARK.toString()};
  padding: 16px 16px 18px 16px;
  overflow: hidden;
  border-bottom-width: 2;
  border-bottom-color: ${Colors.DARKER.toString()};
`;
