import React from "react";
import { View } from "react-native";
import { SFC, Colors, Text } from "primitives";
import { Row } from "ui";
import styled from "styled-components/native";

export const SpotlightGame: SFC = ({ style }) => {
  return (
    <Container style={style}>
      <Row>
        <Text cat={"DisplayS"} style={{ paddingLeft: 8, paddingTop: 4 }}>
          {"Spotlight Game: Rolling Variants"}
        </Text>
        <View></View>
      </Row>
    </Container>
  );
};

const Container = styled(View)`
  height: 100px;
  width: 400px;
  background-color: ${Colors.DARKER.toString()};
  border-color: ${Colors.DARKISH.toString()};
  border-width: 1px;
  border-radius: 4px;
`;
