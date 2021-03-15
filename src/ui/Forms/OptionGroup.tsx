import React, { ReactElement } from "react";
import { ViewStyle, StyleProp, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Colors, Text } from "primitives";
import { AbsoluteView } from "ui";

interface Option<T> {
  label: ReactElement;
  value: T;
  flex?: number;
  disabled?: boolean;
}

interface Props<T> {
  options: Option<T>[];
  setSelected: (selected: T) => void;
  selected: T;
  style: StyleProp<ViewStyle>;
  title?: string;
}

export function OptionGroup<T>({
  options,
  setSelected,
  selected,
  style,
  title,
}: Props<T>): ReactElement {
  return (
    <Container style={style}>
      {title && (
        <Text cat={"DisplayXS"} style={{ marginRight: 12 }}>
          {title}
        </Text>
      )}
      {options.map((option, i) => {
        return (
          <PressableOption
            key={i}
            style={{ flex: option.flex }}
            active={option.value === selected}
            flex={option.flex !== undefined}
            disabled={option.disabled === true}
            onPress={(): void => setSelected(option.value)}
          >
            {option.label}
            {option.disabled === true && <PressableOptionCover />}
          </PressableOption>
        );
      })}
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: -4px;
`;

const PressableOption = styled(TouchableOpacity)<{
  active: boolean;
  flex: boolean;
}>`
  height: 28px;
  width: 28px;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${({ active, flex }): number => (active && flex ? 3 : 4)}px;
  background-color: ${({ active }): string =>
    active
      ? Colors.MCHESS_ORANGE.fade(0.85).toString()
      : Colors.GREY.fade(0.9).toString()};
  border-radius: 4px;
  border-width: ${({ active }): number => (active ? 1 : 0)}px;
  border-color: ${Colors.MCHESS_ORANGE.fade(0).toString()};
`;

const PressableOptionCover = styled(AbsoluteView)`
  background-color: ${Colors.BLACK.fade(0.5).toString()};
  border-radius: 4px;
`;
