import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { CheckBoxFilled, CheckBoxEmpty, Colors } from "primitives";
// import { Platform } from "react-native";

interface Props {
  value: boolean;
  setValue: (v: boolean) => void;
}

export const CheckBox: FC<Props> = ({ value, setValue }) => {
  return (
    <TouchableOpacity
      accessibilityRole={"checkbox"}
      onPress={(): void => setValue(!value)}
    >
      {value ? (
        <CheckBoxFilled color={Colors.MCHESS.toString()} />
      ) : (
        <CheckBoxEmpty color={Colors.GREY.fade(0.4).toString()} />
      )}
    </TouchableOpacity>
  );
};

// const platformSpecificStyle = {};

// primary: Colors.GREY.toString(), // Selected border
// neutral30: Colors.GREY.fade(0.2).toString(), // Hovered border
// primary50: Colors.GREY.fade(0.8).toString(), // During press of option
