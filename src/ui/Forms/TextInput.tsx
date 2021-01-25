import React, { useState } from "react";
import { TextInput as NativeTextInput, TextStyle, Platform } from "react-native";
import { SFC, Colors, useHover } from "primitives";
import { sizes } from "primitives";

interface Props {
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
  onSubmitEditing?: () => void;
  multiline?: boolean;
}

export const TextInput: SFC<Props> = ({ style, multiline, ...rest }) => {
  const [focused, setFocused] = useState(false);
  const [ref, hovered] = useHover();

  const defaultStyle = {
    height: 36,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: focused
      ? Colors.GREY.toString()
      : hovered
      ? Colors.GREY.fade(0.2).toString()
      : Colors.GREY.fade(0.4).toString(),
    paddingHorizontal: 12,
    color: Colors.TEXT.LIGHT.toString(),
    fontSize: sizes["BodyXS"].size,
    lineHeight: sizes["BodyXS"].lineHeight,
    ...(Platform.OS === "web" ? { outlineWidth: 0 } : {}),
    ...(multiline ? { paddingVertical: 12 } : {}),
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
      placeholderTextColor={Colors.TEXT.LIGHT_SECONDARY.toString()}
      multiline={multiline}
      {...rest}
    />
  );
};
