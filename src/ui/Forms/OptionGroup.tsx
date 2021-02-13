import React, { ReactElement } from "react";
import { ViewStyle, StyleProp, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Colors, Text } from "primitives";

interface Option<T> {
  label: ReactElement;
  value: T;
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
      {title !== undefined && (
        <Text cat={"DisplayXS"} style={{ marginRight: 12 }}>
          {title}
        </Text>
      )}
      {options.map((option, i) => {
        return (
          <PressableOption
            key={i}
            active={option.value === selected}
            onPress={(): void => setSelected(option.value)}
          >
            {option.label}
          </PressableOption>
        );
      })}
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const PressableOption = styled(TouchableOpacity)<{ active: boolean }>`
  height: 28;
  width: 28;
  justify-content: center;
  align-items: center;
  margin-right: 8;
  background-color: ${({ active }): string =>
    active ? Colors.GREY.fade(0.6).toString() : Colors.GREY.fade(0.9).toString()};
  border-radius: 4;
  border-width: ${({ active }): number => (active ? 1 : 0)};
  border-color: ${Colors.TEXT.LIGHT_SECONDARY.toString()};
`;
