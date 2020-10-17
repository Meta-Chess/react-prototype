import React, { FC } from "react";
import { View } from "react-native";
import { Board } from "components/shared/Board";
import { Colors } from "primitives";
import styled from "styled-components/native";

const ShadowBoard: FC = () => {
  return (
    <Container>
      <Board
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        maxSize={800}
        backboard={false}
      />
      <ShadowLayer />
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 24px;
`;

const ShadowLayer = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${Colors.DARKEST.fade(0.1).toString()};
`;

export { ShadowBoard };
