import React from "react";
import { View } from "react-native";
import { SFC, Colors, Text } from "primitives";
import styled from "styled-components/native";

export const SpotlightGame: SFC = ({ style }) => {
  return (
    <Container style={style}>
      <Text cat={"DisplayS"} style={{ paddingLeft: 8, paddingTop: 4 }}>
        {"Spotlight Game"}
      </Text>
      <View></View>
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
