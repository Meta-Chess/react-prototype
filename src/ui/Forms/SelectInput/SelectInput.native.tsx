import React from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors, SFC, DownCaretIcon } from "primitives";
import { Option } from "./types";

interface Props {
  options: Option[];
  onChange?: (value?: any) => void; //eslint-disable-line @typescript-eslint/no-explicit-any
}

export const SelectInput: SFC<Props> = ({ options, style, onChange }) => {
  return (
    <View style={[style]}>
      <DropDownPicker
        onChangeItem={(option): void => {
          onChange?.(option.value);
        }}
        items={options}
        defaultValue={options[0].label}
        style={{
          backgroundColor: Colors.DARKEST.toString(),
          borderWidth: 2,
          borderColor: Colors.GREY.fade(0.4).toString(),
          borderRadius: 4,
          width: 240,
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
          <DownCaretIcon color={Colors.MCHESS.toString()} />
        )}
        customArrowUp={(): React.ReactElement => (null as unknown) as JSX.Element}
      />
    </View>
  );
};
