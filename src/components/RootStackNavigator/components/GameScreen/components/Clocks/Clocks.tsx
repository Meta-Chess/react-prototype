import React from "react";
import { SFC } from "primitives";
import styled from "styled-components/native";
import { Timer } from "./components";
import { View } from "react-native";

const Clocks: SFC = ({ style }) => {
  return (
    <Container style={style}>
      <Timer style={{ marginRight: 8 }} />
      <Timer />
    </Container>
  );
};

const Container = styled(View)`
  display: flex;
  flex-direction: row;
`;

export { Clocks };
