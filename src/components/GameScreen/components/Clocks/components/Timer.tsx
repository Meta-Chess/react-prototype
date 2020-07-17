import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
import { SFC } from "primitives";

const Timer: SFC = ({ style }) => {
  const [state, setState] = useState({ time: moment().toString() });
  setInterval(() => {
    setState({ time: moment().toString() });
  });

  return (
    <Container style={style}>
      <Text style={{ color: "white" }}>{3 + 4}</Text>
    </Container>
  );
};

const Container = styled(View)`
  padding: 8px 12px;
  border-radius: 8px;
  background: #0a0a0a;
`;

export { Timer };
