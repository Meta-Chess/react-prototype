import React, { FC, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import {View} from "react-native";

const Timer: FC = () => {
  const [state, setState] = useState({ time: moment().toString() });
  setInterval(() => {
    setState({ time: moment().toString() });
  });

  return <Container>{3 + 4}</Container>;
};

const Container = styled(View)`
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  background: #0a0a0a;
`;

export { Timer };
