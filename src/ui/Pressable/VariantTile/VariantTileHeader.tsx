import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { FutureVariant } from "game";
import Color from "color";

interface Props {
  variant: FutureVariant;
  selected: boolean;
  clash: boolean;
}

export const VariantTileHeader: SFC<Props> = ({ variant, selected, clash }) => {
  const success = Colors.SUCCESS.fade(0.25);
  const fail = Colors.ERROR.fade(0.25);
  const color = !selected ? Colors.DARKISH : clash ? fail : success;
  return (
    <Container color={color}>
      <View style={{ flex: 1 }}>
        <TitleText
          cat="DisplayXS"
          weight="heavy"
          color={Colors.TEXT.LIGHT.toString()}
          numberOfLines={1}
        >
          {variant.title}
        </TitleText>
      </View>
      <ComplexityDot>
        <Text cat="BodyXS" weight="heavy" alignment="center">
          {variant.complexity}
        </Text>
      </ComplexityDot>
    </Container>
  );
};

const Container = styled(View)<{ color: Color }>`
  height: 30px;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${({ color }): string => color.toString()};
`;

const TitleText = styled(Text)`
  padding-horizontal: 8px;
  text-align: center;
`;

const ComplexityDot = styled(View)`
  width: 20;
  height: 20;
  position: absolute;
  right: 8;
  align-self: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${Colors.BLACK.fade(0.7).toString()};
`;
