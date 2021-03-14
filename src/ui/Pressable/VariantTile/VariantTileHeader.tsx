import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { AdviceLevel, FutureVariant } from "game";
import Color from "color";

interface Props {
  variant: FutureVariant;
  selected: boolean;
  conflictLevel: AdviceLevel | undefined;
}

const BACKGROUND_COLOR: { [key in AdviceLevel]: Color } = {
  SUCCESS: Colors.SUCCESS.fade(0.25),
  ERROR: Colors.ERROR.fade(0.25),
  WARNING: Colors.WARNING.fade(0.25),
};

export const VariantTileHeader: SFC<Props> = ({ variant, selected, conflictLevel }) => {
  const color = !selected ? Colors.DARKISH : BACKGROUND_COLOR[conflictLevel || "SUCCESS"];
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
        <Text cat="BodyXS" weight="heavy" alignment="center" selectable={false}>
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
  width: 20px;
  height: 20px;
  position: absolute;
  right: 8px;
  align-self: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${Colors.BLACK.fade(0.7).toString()};
`;
