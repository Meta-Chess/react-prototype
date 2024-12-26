import React, { useState, useCallback } from "react";
import { TextInput } from "./TextInput";
import { SFC } from "primitives";
import { debounce } from "lodash";

interface Props {
  afterChangeText: (text: string) => void;
  placeholder?: string;
  delay?: number;
  onSubmitEditing?: (text: string) => void;
}

export const DebouncedTextInput: SFC<Props> = ({
  afterChangeText,
  placeholder,
  style,
  delay = 100,
  onSubmitEditing,
}) => {
  const [text, setText] = useState("");

  const debouncedAfterChange = useCallback(
    debounce((text: string): void => afterChangeText(text), delay),
    []
  );

  const onChangeText = useCallback(
    (text: string) => {
      setText(text);
      debouncedAfterChange(text);
    },
    [debouncedAfterChange]
  );

  return (
    <TextInput
      value={text}
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={style}
      onSubmitEditing={(): void => onSubmitEditing?.(text)}
    />
  );
};
