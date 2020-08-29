import React from "react";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Colors, Text, SFC, DownCaretIcon } from "primitives";
import { Option } from "./types";

interface Props {
  options: Option[];
  onChange?: (value?: Option) => void;
  placeholder?: string;
}

export const SelectInput: SFC<Props> = ({ options, style, onChange, placeholder }) => {
  return (
    <View style={[style]}>
      <RNPickerSelect
        onValueChange={(value) => {
          onChange?.(value);
        }}
        items={options.slice(1)}
        style={{
          viewContainer: {
            borderWidth: 2,
            borderColor: Colors.GREY.fade(0.4).toString(),
            borderRadius: 4,
            width: 240,
            height: 40,
            justifyContent: "center",
            padding: 12,
          },
          inputIOS: {
            color: Colors.TEXT.LIGHT.toString(),
          },
          inputAndroid: {
            color: Colors.TEXT.LIGHT.toString(),
          },
          placeholder: {
            color: Colors.TEXT.LIGHT.toString(),
          },
        }}
        placeholder={options[0]}
        Icon={() => (
          <View style={{ position: "absolute", left: -20, top: -6 }}>
            <DownCaretIcon color={Colors.MCHESS.toString()} />
          </View>
        )}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};
