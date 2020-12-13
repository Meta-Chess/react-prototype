import React, { useState } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { SFC, Colors } from "primitives";

interface Props {
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
}

export const TextInput: SFC<Props> = ({ onChangeText, placeholder, value, style }) => {
  const [focused, setFocused] = useState(false);

  return (
    <NativeTextInput
      style={[
        style,
        {
          height: 44,
          width: 240,
          borderWidth: 2,
          borderRadius: 4,
          borderColor: focused
            ? Colors.GREY.toString()
            : Colors.GREY.fade(0.4).toString(),
          paddingHorizontal: 12,
          color: Colors.TEXT.LIGHT.toString(),
          // outlineWidth: 0, // TODO: Fix type error (note - this line stops it looking weird in chrome, but might cause accessibility problems)
        },
      ]}
      onFocus={(): void => {
        setFocused(true);
      }}
      onBlur={(): void => {
        setFocused(false);
      }}
      onChangeText={onChangeText}
      placeholder={placeholder}
      value={value}
    />
  );
};
