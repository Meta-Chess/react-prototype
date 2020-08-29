import React from "react";
import { View } from "react-native";
import Select, { IndicatorProps, components } from "react-select";
import { Colors, Text, SFC } from "primitives";
import styled from "styled-components/native";
import { DownCaretIcon } from "primitives";

export interface Option {
  label: string;
  value: any;
}

interface Props {
  options: Option[];
  onChange?: (value?: Option) => void;
}

export const SelectInput: SFC<Props> = ({ options, style, onChange }) => {
  return (
    <View style={[style]}>
      <Select
        onChange={(option): void => {
          if (Array.isArray(option))
            throw new Error("Multiple option selection not supported");
          if (option) onChange?.(option as Option); // TODO: Think about type safety
        }}
        options={options}
        components={{ DropdownIndicator }}
        formatOptionLabel={OptionLabel}
        defaultValue={options[0]}
        searchable={false}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: Colors.GREY.toString(), // Selected border
            neutral30: Colors.GREY.fade(0.2).toString(), // Hovered border
            primary50: Colors.GREY.fade(0.8).toString(), // During press of option
          },
        })}
        styles={{
          control: (baseStyle, { isFocused }) => ({
            ...baseStyle,
            width: 240,
            borderRadius: 4,
            border: `2px solid ${Colors.GREY.fade(0.4).toString()}`,
            backgroundColor: Colors.DARKEST.toString(),
            boxShadow: isFocused ? "0" : "0",
          }),
          menu: (baseStyle) => ({
            ...baseStyle,
            backgroundColor: Colors.DARK.toString(),
          }),
          option: (baseStyle, { isFocused, isSelected }) => ({
            ...baseStyle,
            backgroundColor: isSelected
              ? Colors.GREY.fade(0.8).toString()
              : isFocused
              ? Colors.GREY.fade(0.9).toString()
              : Colors.DARK.toString(),
          }),
          indicatorSeparator: (baseStyle) => ({
            ...baseStyle,
            display: "none",
          }),
        }}
      />
    </View>
  );
};

const OptionLabel: React.FC<Option> = ({ label }) => {
  return <Text.BodyL color={Colors.TEXT.LIGHT.toString()}>{label}</Text.BodyL>;
};

const DropdownIndicator: React.FC<IndicatorProps<any>> = (props: IndicatorProps<any>) => {
  return (
    <components.DropdownIndicator {...props}>
      <DownCaretIcon color={Colors.MCHESS.toString()} />
    </components.DropdownIndicator>
  );
};

const StyledSelect = styled(Select)`
  border-radius: 4 border;
`;
