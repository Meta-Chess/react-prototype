import React from "react";
import { SFC } from "primitives";
import { TouchableOpacity } from "react-native";
import { TraitClass, traitInfo } from "game/types";

interface TraitFilterProps {
  trait: TraitClass;
  selected: boolean;
  onPress: () => void;
}

const TraitFilter: SFC<TraitFilterProps> = ({ trait, style, selected, onPress }) => {
  const color = traitInfo[trait].color;
  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: selected ? color.toString() : color.fade(0.75).toString(),
          borderRadius: 10,
          width: 20,
          height: 20,
        },
      ]}
      onPress={onPress}
    />
  );
};

export { TraitFilter };
