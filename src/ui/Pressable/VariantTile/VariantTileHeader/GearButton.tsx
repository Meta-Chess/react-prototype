import React from "react";
import { TouchableOpacity } from "react-native";
import { SFC, Colors, useHover } from "primitives";
import { SparkleGearIcon } from "primitives/icons";

interface Props {
  onPress: () => void;
}
export const GearButton: SFC<Props> = ({ onPress, style }) => {
  const [ref, hovered] = useHover();
  return (
    <TouchableOpacity style={style} ref={ref} onPress={onPress}>
      <SparkleGearIcon
        color={
          hovered
            ? Colors.TEXT.LIGHT_SECONDARY.fade(0.7).toString()
            : Colors.TEXT.LIGHT_SECONDARY.toString()
        }
      />
    </TouchableOpacity>
  );
};
