import React, { FC, ReactElement } from "react";
import { View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Row } from "ui";
interface Props {
  windowWidth: number;
  windowHeight: number;
  a: ReactElement;
  b: ReactElement;
}

export const StartScreenLayoutContainer: FC<Props> = ({
  windowWidth,
  windowHeight,
  a,
  b,
}) => {
  const portrait = windowHeight > windowWidth;

  return portrait ? (
    <>
      <View style={{ height: windowHeight, width: windowWidth }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <Container style={{ height: Math.min(windowWidth, 600) }}>{a}</Container>
          <Container style={{ flexGrow: 1, marginVertical: 24 }}>{b}</Container>
        </ScrollView>
      </View>
    </>
  ) : (
    <Row style={{ flex: 1, alignItems: "stretch", padding: 16, minWidth: 600 }}>
      <Container style={{ flex: 2 }}>{a}</Container>
      <Container
        style={{
          flex: 1,
          minWidth: 400,
          marginLeft: 32,
          justifyContent: "center",
        }}
      >
        {b}
      </Container>
    </Row>
  );
};

const Container = styled(View)`
  justify-content: center;
  align-items: center;
`;
