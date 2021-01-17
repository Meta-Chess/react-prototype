import React from "react";
import { SFC, Text } from "primitives";
import { View } from "react-native";
import { TraitName, traitInfo } from "game/variants/traitInfo";
import { opacify } from "utilities";
import { Colors } from "primitives";
import styled from "styled-components/native";

interface TraitLabelProps {
  trait: TraitName;
}

const TraitLabel: SFC<TraitLabelProps> = ({ trait, style }) => {
  const color = opacify(traitInfo[trait].color.toString(), 0.5);
  return (
    <Container style={style} color={color}>
      <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT.toString()}>
        {trait}
      </Text>
    </Container>
  );
};

const Container = styled(View)<{ color: string }>`
  border-radius: 6px;
  padding-horizontal: 7px;
  padding-vertical: 1px;
  margin-top: 1px;
  background-color: ${({ color }): string => color};
`;

export { TraitLabel };
