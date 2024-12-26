import React, { CSSProperties, ReactNode } from "react";
import { View } from "react-native";
import Select, { IndicatorProps, components, Theme } from "react-select";
import { Colors, Text, SFC } from "primitives";
import { DownCaretIcon } from "primitives";
import { Option } from "./types";

interface Props {
  options: Option[];
  defaultOption?: Option;
  onChange?: (value?: any) => void; //eslint-disable-line @typescript-eslint/no-explicit-any
  zIndex?: number;
}

export const SelectInput: SFC<Props> = ({ options, defaultOption, style, onChange }) => {
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
        isDisabled={options.length === 1}
        components={{ DropdownIndicator }}
        formatOptionLabel={OptionLabel}
        defaultValue={defaultOption || options[0]}
        isSearchable={false}
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
          valueContainer: (baseStyle): CSSProperties => ({
            ...baseStyle,
            height: 34,
            marginTop: -4,
          }),
          control: (baseStyle, { isFocused }): CSSProperties => ({
            ...baseStyle,
            borderRadius: 4,
            border: `1px solid ${Colors.GREY.fade(0.4).toString()}`,
            backgroundColor: "transparent",
            boxShadow: isFocused ? "0" : "0",
            height: 36,
            minHeight: 36,
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
            height: 36,
          }),
          indicatorSeparator: (baseStyle): CSSProperties => ({
            ...baseStyle,
            display: "none",
          }),
          dropdownIndicator: (baseStyle): CSSProperties => ({
            ...baseStyle,
            visibility: options.length === 1 ? "hidden" : "visible",
          }),
        }}
      />
    </View>
  );
};

const OptionLabel = ({ label }: Option): ReactNode => {
  return (
    <Text
      alignment="center"
      cat="BodyXS"
      color={Colors.TEXT.LIGHT.toString()}
      selectable={false}
    >
      {label}
    </Text>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownIndicator: React.FC<IndicatorProps<any, false>> = (
  props: IndicatorProps<any, false>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <DownCaretIcon color={Colors.MCHESS_ORANGE.toString()} />
    </components.DropdownIndicator>
  );
};
