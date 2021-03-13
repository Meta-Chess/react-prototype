import React, { FC, ReactElement } from "react";
import { View, useWindowDimensions, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Row } from "ui";

interface Props {
  a: ReactElement;
  b: ReactElement;
}

export const StartScreenLayoutContainer: FC<Props> = ({ a, b }) => {
  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  return portrait ? (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      <Container style={{ height: Math.min(width, 600) }}>{a}</Container>
      <Container style={{ flexGrow: 1, marginVertical: 24 }}>{b}</Container>
    </ScrollView>
  ) : (
    <Row style={{ flex: 1, alignItems: "stretch", padding: 16, minWidth: 600 }}>
      <Container style={{ flex: 2 }}>{a}</Container>
      <Container style={{ flex: 1, minWidth: 400, marginLeft: 32 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          {b}
        </ScrollView>
      </Container>
    </Row>
  );
};

const Container = styled(View)`
  justify-content: center;
  align-items: center;
`;
