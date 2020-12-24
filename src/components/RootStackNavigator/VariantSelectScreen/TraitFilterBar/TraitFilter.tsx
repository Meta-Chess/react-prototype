import React from "react";
import { SFC } from "primitives";
import { TouchableOpacity, View } from "react-native";
import { TraitClass, traitInfo } from "game/variants";
import { Text, Colors } from "primitives";
import styled from "styled-components/native";
import Color from "color";
interface TraitFilterProps {
  trait: TraitClass;
  numTraitInSet: number;
  selected: boolean;
  onPress: () => void;
}

const TraitFilter: SFC<TraitFilterProps> = ({
  trait,
  numTraitInSet,
  style,
  selected,
  onPress,
}) => {
  const baseColor = traitInfo[trait].color.fade(0.5);
  const color = selected ? baseColor : baseColor.fade(0.5);
  return (
    <TouchableLabel style={style} color={color} onPress={onPress}>
      <Text cat={"BodyS"} color={Colors.TEXT.LIGHT.toString()}>
        {traitInfo[trait].name}
      </Text>
      <CountContainer>
        <Text
          style={{ marginBottom: 1 }}
          cat={"BodyXS"}
          color={Colors.TEXT.LIGHT.toString()}
        >
          {numTraitInSet.toString()}
        </Text>
      </CountContainer>
    </TouchableLabel>
  );
};

const TouchableLabel = styled(TouchableOpacity)<{ color: Color }>`
  flex-direction: row;
  border-radius: 6px;
  padding-horizontal: 7px;
  padding-vertical: 1px;
  margin-top: 1px;
  background-color: ${({ color }): string => color.string()};
`;

const CountContainer = styled(View)`
  align-items: center;
  width: 17px;
  height: 17px;
  border-radius: 50px;
  margin-top: 2px;
  margin-left: 5px;
  background-color: ${Colors.BLACK.fade(0.75).toString()};
`;

export { TraitFilter };
