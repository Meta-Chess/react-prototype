import React from "react";
import { SFC } from "primitives";
import { TouchableOpacity } from "react-native";
import { traitInfo } from "game/types";

interface TraitFilterProps {
  trait: string;
  unselected: boolean;
  onPress: () => void;
}

const TraitFilter: SFC<TraitFilterProps> = ({ trait, style, unselected, onPress }) => {
  const color = traitInfo[trait as keyof typeof traitInfo].color;
  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: unselected ? color.fade(0.75).toString() : color.toString(),
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
