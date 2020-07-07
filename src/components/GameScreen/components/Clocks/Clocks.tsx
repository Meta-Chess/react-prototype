import React, { FC } from "react";
import styled from "styled-components";
import { Timer } from "./components";
import {View} from "react-native";

const Clocks: FC = () => {
  return (
    <Container>
      <Timer />
      <Timer />
    </Container>
  );
};

const Container = styled(View)`
  display: flex;
  flex-direction: row;
`;

export { Clocks };
