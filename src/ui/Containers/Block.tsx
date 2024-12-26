import React, { ReactElement } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { Row } from "..";

interface Props {
  title?: string;
  withTitle?: ReactElement;
}

export const Block: SFC<Props> = ({ title, withTitle, children, style }) => {
  return (
    <Container style={style}>
      {title && (
        <Row>
          <Text cat="DisplayM" style={{ marginRight: 8 }}>
            {title}
          </Text>
          {withTitle}
        </Row>
      )}
      {children}
    </Container>
  );
};

const Container = styled(View)`
  background-color: ${Colors.DARK.toString()};
  padding: 16px 16px 18px 16px;
  overflow: hidden;
  border-bottom-width: 2px;
  border-bottom-color: ${Colors.DARKER.toString()};
`;
