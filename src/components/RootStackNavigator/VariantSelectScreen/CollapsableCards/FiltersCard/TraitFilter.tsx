import React from "react";
import { SFC } from "primitives";
import { TouchableOpacity, View } from "react-native";
import { TraitName, traitInfo } from "game/variants/traitInfo";
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
      selected={selected}
      onPress={onPress}
    >
      <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT.toString()} selectable={false}>
        {trait}
      </Text>
      <CountContainer
        labelPadding={labelPadding}
        counterPadding={counterPadding}
        verticalPadding={verticalPadding}
        selected={selected}
      >
        <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT.toString()} selectable={false}>
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
  selected: boolean;
}>`
  flex-direction: row;
  border-radius: 4px;
  padding-left: ${({ labelPadding, selected }): number =>
    selected ? labelPadding : labelPadding + 1}px;
  padding-vertical: ${({ verticalPadding, selected }): number =>
    selected ? verticalPadding - 1 : verticalPadding}px;
  background-color: ${({ color }): string => color.string()};
  border-width: ${({ selected }): number => (selected ? 1 : 0)}px;
  border-color: ${Colors.GREY.toString()};
  overflow: hidden;
`;

const CountContainer = styled(View)<{
  labelPadding: number;
  counterPadding: number;
  verticalPadding: number;
  selected: boolean;
}>`
  justify-content: center;
  margin-vertical: -${({ verticalPadding }): number => verticalPadding}px;
  margin-left: ${({ labelPadding }): number => labelPadding}px;
  padding-left: ${({ counterPadding }): number => counterPadding}px;
  padding-right: ${({ counterPadding, selected }): number =>
    selected ? counterPadding : counterPadding + 1}px;
  background-color: ${Colors.BLACK.fade(0.75).toString()};
`;

export { TraitFilter };
