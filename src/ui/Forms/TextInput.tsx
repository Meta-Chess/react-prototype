import React, { useState } from "react";
import { TextInput as NativeTextInput, TextStyle } from "react-native";
import { SFC, Colors, useHover } from "primitives";

interface Props {
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
}

export const TextInput: SFC<Props> = ({ onChangeText, placeholder, value, style }) => {
  const [focused, setFocused] = useState(false);
  const [ref, hovered] = useHover();

  return (
    <NativeTextInput
      ref={ref}
      style={[
        {
          height: 44,
          width: 300,
          borderWidth: 2,
          borderRadius: 4,
          borderColor: focused
            ? Colors.GREY.toString()
            : hovered
            ? Colors.GREY.fade(0.2).toString()
            : Colors.GREY.fade(0.4).toString(),
          paddingHorizontal: 12,
          color: Colors.TEXT.LIGHT.toString(),
          outlineWidth: 0,
        } as TextStyle,
        style,
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
