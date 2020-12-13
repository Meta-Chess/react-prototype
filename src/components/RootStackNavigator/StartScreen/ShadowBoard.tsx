import React, { FC } from "react";
import { Board } from "components/shared/Board";
import { Colors } from "primitives";
import { AbsoluteView } from "ui";
import styled from "styled-components/native";

const ShadowBoard: FC = () => {
  return (
    <AbsoluteView>
      <Board
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
        maxSize={800}
        backboard={false}
      />
      <ShadowLayer />
    </AbsoluteView>
  );
};

const ShadowLayer = styled(AbsoluteView)`
  background-color: ${Colors.DARKEST.fade(0.1).toString()};
`;

export { ShadowBoard };
