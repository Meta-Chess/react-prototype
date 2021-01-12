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
  const labelPadding = 4;
  const counterPadding = 4;
  const verticalPadding = 1;
  return (
    <TouchableLabel
      labelPadding={labelPadding}
      counterPadding={counterPadding}
      verticalPadding={verticalPadding}
      style={style}
      color={color}
      onPress={onPress}
    >
      <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT.toString()}>
        {trait}
      </Text>
      <CountContainer
        labelPadding={labelPadding}
        counterPadding={counterPadding}
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
  labelPadding: number;
  counterPadding: number;
  verticalPadding: number;
}>`
  flex-direction: row;
  border-radius: 4px;
  padding-left: ${({ labelPadding }): number => labelPadding}px;
  padding-vertical: ${({ verticalPadding }): number => verticalPadding}px;
  background-color: ${({ color }): string => color.string()};
  overflow: hidden;
`;

const CountContainer = styled(View)<{
  labelPadding: number;
  counterPadding: number;
  verticalPadding: number;
}>`
  justify-content: center;
  margin-vertical: -${({ verticalPadding }): number => verticalPadding}px;
  margin-left: ${({ labelPadding }): number => labelPadding}px;
  padding-left: ${({ counterPadding }): number => counterPadding}px;
  padding-right: ${({ counterPadding }): number => counterPadding}px;
  background-color: ${Colors.BLACK.fade(0.75).toString()};
`;

export { TraitFilter };
