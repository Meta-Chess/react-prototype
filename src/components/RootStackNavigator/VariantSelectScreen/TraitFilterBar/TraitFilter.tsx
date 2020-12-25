import React from "react";
import { SFC } from "primitives";
import { TouchableOpacity, View } from "react-native";
import { TraitName, traitInfo } from "game/variants";
import { Text, Colors } from "primitives";
import styled from "styled-components/native";
import Color from "color";

interface TraitFilterProps {
  trait: TraitName;
  numberOfVariantsWithTrait: number;
  selected: boolean;
  onPress: () => void;
}

const TraitFilter: SFC<TraitFilterProps> = ({
  trait,
  numberOfVariantsWithTrait,
  style,
  selected,
  onPress,
}) => {
  const baseColor = traitInfo[trait].color.fade(0.5);
  const color = selected ? baseColor : baseColor.fade(0.5);
  const outerPadding = 8;
  const innerPadding = 6;
  const verticalPadding = 2;
  return (
    <TouchableLabel
      outerPadding={outerPadding}
      innerPadding={innerPadding}
      verticalPadding={verticalPadding}
      style={style}
      color={color}
      onPress={onPress}
    >
      <Text cat={"BodyS"} color={Colors.TEXT.LIGHT.toString()}>
        {trait}
      </Text>
      <CountContainer
        outerPadding={outerPadding}
        innerPadding={innerPadding}
        verticalPadding={verticalPadding}
      >
        <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT.toString()}>
          {numberOfVariantsWithTrait.toString()}
        </Text>
      </CountContainer>
    </TouchableLabel>
  );
};

const TouchableLabel = styled(TouchableOpacity)<{
  color: Color;
  outerPadding: number;
  innerPadding: number;
  verticalPadding: number;
}>`
  flex-direction: row;
  border-radius: 6px;
  padding-left: ${({ outerPadding }): number => outerPadding}px;
  padding-vertical: ${({ verticalPadding }): number => verticalPadding}px;
  background-color: ${({ color }): string => color.string()};
  overflow: hidden;
`;

const CountContainer = styled(View)<{
  outerPadding: number;
  innerPadding: number;
  verticalPadding: number;
}>`
  justify-content: center;
  margin-vertical: -${({ verticalPadding }): number => verticalPadding}px;
  margin-left: ${({ innerPadding }): number => innerPadding}px;
  padding-left: ${({ innerPadding }): number => innerPadding}px;
  padding-right: ${({ outerPadding }): number => outerPadding}px;
  background-color: ${Colors.BLACK.fade(0.75).toString()};
`;

export { TraitFilter };
