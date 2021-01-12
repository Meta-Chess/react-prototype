import React from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors, SFC, DownCaretIcon } from "primitives";
import { Option } from "./types";

interface Props {
  options: Option[];
  onChange?: (value?: any) => void; //eslint-disable-line @typescript-eslint/no-explicit-any
  zIndex?: number;
}

export const SelectInput: SFC<Props> = ({ options, style, onChange, zIndex }) => {
  const simplifiedOptions = options.map((o) => ({ label: o.label, value: o.label }));
  return (
    <View style={[style]}>
      <DropDownPicker
        onChangeItem={(option): void => {
          const value = options.find((o) => o.label === option.label)?.value;
          onChange?.(value);
        }}
        items={simplifiedOptions}
        defaultValue={options[0].label}
        style={{
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: Colors.GREY.fade(0.4).toString(),
          borderRadius: 4,
          width: 300,
          justifyContent: "center",
          padding: 12,
        }}
        containerStyle={{ height: 40 }}
        dropDownStyle={{
          backgroundColor: Colors.DARK.toString(),
          borderWidth: 0,
          borderRadius: 4,
        }}
        itemStyle={{
          justifyContent: "flex-start",
          paddingLeft: 12,
        }}
        labelStyle={{ color: Colors.TEXT.LIGHT.toString() }}
        customArrowDown={(): React.ReactElement => (
          <DownCaretIcon color={Colors.MCHESS_ORANGE.toString()} />
        )}
        customArrowUp={(): React.ReactElement => (
          <DownCaretIcon color={Colors.MCHESS_ORANGE.toString()} />
        )}
        zIndex={zIndex}
      />
    </View>
  );
};
