import React, { FC } from "react";
import { H1, P } from "primitives";
import { Row } from "ui";

export const NimbusSection: FC = () => {
  return (
    <>
      <Row style={{ alignItems: "center" }}>
        <H1 style={{ marginTop: 0 }}>About Nimbus</H1>
      </Row>

      <P>
        Nimbus is an abstract strategy game designed by Aiden Zelandonii and Brian
        Armstrong. Starting out as a board game, Neural Forge has teamed up with mchess to
        bring a digital version to life.
      </P>
    </>
  );
};
