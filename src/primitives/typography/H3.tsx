import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Colors, SFC, Text } from "primitives";

export const H3: SFC = ({ style, children }) => {
  return (
    <Container style={style}>
      <Text cat="DisplayXS" color={Colors.MCHESS_ORANGE.toString()}>
        {children}
      </Text>
    </Container>
  );
};

const Container = styled(View)`
  margin-top: 12px;
  margin-bottom: 4px;
`;
