import React from "react";
import { SFC } from "primitives";
import { TouchableOpacity } from "react-native";
import { TraitClass, traitInfo } from "game/variants";
import styled from "styled-components/native";
import Color from "color";

interface TraitFilterProps {
  trait: TraitClass;
  selected: boolean;
  onPress: () => void;
}

const TraitFilter: SFC<TraitFilterProps> = ({ trait, style, selected, onPress }) => {
  const baseColor = traitInfo[trait].color;
  const color = selected ? baseColor : baseColor.fade(0.75);
  return <TouchableDot style={style} onPress={onPress} color={color} />;
};

const TouchableDot = styled(TouchableOpacity)<{ color: Color }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ color }): string => color.string()};
`;

export { TraitFilter };
