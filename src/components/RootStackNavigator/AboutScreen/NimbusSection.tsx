import React, { FC } from "react";
import { H1, H2, P } from "primitives";
import { H3 } from "primitives/typography/H3";
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

      <H2>Rules</H2>
      <P>
        In Nimbus each side consists of 8 pieces, 7 standard and one Nimbus piece
        (indicated by the yellow star). There are 4 types of pieces, each with differing
        move sets:
      </P>
      <P>• Fire: moves up to 4 spaces in a line</P>
      <P>• Water: moves unlimited spaces in the direction of its corners</P>
      <P>• Lightning: skips over every second space</P>
      <P>• Earth: jumps to a new position</P>

      <H3>Win Condition</H3>
      <P>
        There are two ways to win a game, either eliminate your opponent’s Nimbus piece or
        all of their other pieces.
      </P>

      <H3>Turn Structure</H3>
      <P>
        There are two phases for each turn. In the first phase a player will move their
        piece, then in the second phase a player can change the type of one of their
        pieces- this excludes the piece that was just moved, unless it is the Nimbus.
      </P>
    </>
  );
};
