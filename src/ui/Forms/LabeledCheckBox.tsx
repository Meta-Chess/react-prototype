import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Text, Colors, SFC } from "primitives";
import { CheckBox } from "./CheckBox";

interface Props {
  value: boolean;
  setValue: (v: boolean) => void;
  label: string;
}

export const LabeledCheckBox: SFC<Props> = ({ value, setValue, label, style }) => {
  return (
    <Container style={style}>
      <Text.BodyL color={Colors.TEXT.LIGHT.toString()}>{label}</Text.BodyL>
      <CheckBox value={value} setValue={setValue} />
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 8px;
  padding-vertical: 4px;
`;
