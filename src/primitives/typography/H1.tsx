import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Colors, SFC, Text } from "primitives";

export const H1: SFC = ({ style, children, ...rest }) => {
  return (
    <Container style={style}>
      <Text {...rest} cat="DisplayL" color={Colors.MCHESS_ORANGE.toString()}>
        {children}
      </Text>
    </Container>
  );
};

const Container = styled(View)`
  margin-top: 28px;
  margin-bottom: 12px;
`;
