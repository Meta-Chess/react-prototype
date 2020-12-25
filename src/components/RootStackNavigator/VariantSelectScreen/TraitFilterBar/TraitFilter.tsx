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
  return (
    <TouchableLabel style={style} color={color} onPress={onPress}>
      <Text cat={"BodyS"} color={Colors.TEXT.LIGHT.toString()}>
        {trait}
      </Text>
      <CountContainer>
        <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT.toString()}>
          {numberOfVariantsWithTrait.toString()}
        </Text>
      </CountContainer>
    </TouchableLabel>
  );
};

const TouchableLabel = styled(TouchableOpacity)<{ color: Color }>`
  flex-direction: row;
  border-radius: 6px;
  padding-left: 8px;
  margin-top: 1px;
  background-color: ${({ color }): string => color.string()};
  overflow: hidden;
`;

const CountContainer = styled(View)`
  justify-content: center;
  margin-left: 6px;
  padding-left: 6px;
  padding-right: 8px;
  background-color: ${Colors.BLACK.fade(0.75).toString()};
`;

export { TraitFilter };
