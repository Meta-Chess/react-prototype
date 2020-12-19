import React, { useState } from "react";
import { TextInput as NativeTextInput, TextStyle, Platform } from "react-native";
import { SFC, Colors, useHover } from "primitives";

interface Props {
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
  onSubmitEditing?: () => void;
}

export const TextInput: SFC<Props> = ({ style, ...rest }) => {
  const [focused, setFocused] = useState(false);
  const [ref, hovered] = useHover();

  const defaultStyle = {
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
    ...(Platform.OS === "web" ? { outlineWidth: 0 } : {}),
  } as TextStyle;

  return (
    <NativeTextInput
      ref={ref}
      style={[defaultStyle, style]}
      onFocus={(): void => {
        setFocused(true);
      }}
      onBlur={(): void => {
        setFocused(false);
      }}
      {...rest}
    />
  );
};
