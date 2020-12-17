import React, { CSSProperties } from "react";
import { View } from "react-native";
import Select, { IndicatorProps, components, Theme } from "react-select";
import { Colors, Text, SFC } from "primitives";
import { DownCaretIcon } from "primitives";
import { Option } from "./types";

interface Props {
  options: Option[];
  onChange?: (value?: any) => void; //eslint-disable-line @typescript-eslint/no-explicit-any
  zIndex?: number;
}

export const SelectInput: SFC<Props> = ({ options, style, onChange }) => {
  return (
    <View style={style}>
      <Select
        onChange={(optionSelection): void => {
          if (Array.isArray(optionSelection))
            throw new Error("Multiple option selection not supported");
          if (optionSelection) {
            const option = optionSelection as Option; // TODO: Think about type safety
            onChange?.(option.value);
          }
        }}
        options={options}
        components={{ DropdownIndicator }}
        formatOptionLabel={OptionLabel}
        defaultValue={options[0]}
        searchable={false}
        theme={(theme): Theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: Colors.GREY.toString(), // Selected border
            neutral30: Colors.GREY.fade(0.2).toString(), // Hovered border
            primary50: Colors.GREY.fade(0.8).toString(), // During press of option
          },
        })}
        styles={{
          control: (baseStyle, { isFocused }): CSSProperties => ({
            ...baseStyle,
            borderRadius: 4,
            border: `2px solid ${Colors.GREY.fade(0.4).toString()}`,
            backgroundColor: Colors.DARKEST.toString(),
            boxShadow: isFocused ? "0" : "0",
          }),
          menu: (baseStyle): CSSProperties => ({
            ...baseStyle,
            backgroundColor: Colors.DARK.toString(),
            boxShadow: `0px 1px 8px ${Colors.BLACK.fade(0.5).string()}`,
          }),
          option: (baseStyle, { isFocused, isSelected }): CSSProperties => ({
            ...baseStyle,
            backgroundColor: isSelected
              ? Colors.GREY.fade(0.8).toString()
              : isFocused
              ? Colors.GREY.fade(0.9).toString()
              : Colors.DARK.toString(),
          }),
          indicatorSeparator: (baseStyle): CSSProperties => ({
            ...baseStyle,
            display: "none",
          }),
        }}
      />
    </View>
  );
};

const OptionLabel: React.FC<Option> = ({ label }) => {
  return (
    <Text cat="BodyM" color={Colors.TEXT.LIGHT.toString()}>
      {label}
    </Text>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownIndicator: React.FC<IndicatorProps<any>> = (props: IndicatorProps<any>) => {
  return (
    <components.DropdownIndicator {...props}>
      <DownCaretIcon color={Colors.MCHESS_ORANGE.toString()} />
    </components.DropdownIndicator>
  );
};
