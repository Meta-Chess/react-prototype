import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Colors, SFC, Text } from "primitives";

export const P: SFC = ({ style, children }) => {
  return (
    <Container style={style}>
      <Text cat="BodyM" color={Colors.TEXT.LIGHT_SECONDARY.toString()} lineHeight={24}>
        {children}
      </Text>
    </Container>
  );
};

const Container = styled(View)`
  margin-vertical: 4px;
`;
