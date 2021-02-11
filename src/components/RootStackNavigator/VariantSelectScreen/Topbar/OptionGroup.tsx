import React from "react";
import { View } from "react-native";
import { SFC, Text } from "primitives";
import styled from "styled-components/native";

interface Props {
  title: string;
}

const OptionGroup: SFC<Props> = ({ title, children, style }) => {
  return (
    <Container style={style}>
      <Text cat={"DisplayXS"} style={{ marginRight: 12 }}>
        {title}
      </Text>
      {children}
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export { OptionGroup };
