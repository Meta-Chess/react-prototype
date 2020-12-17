import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text, Colors, SFC, CheckBoxFilled, CheckBoxEmpty } from "primitives";

interface Props {
  value: boolean;
  setValue: (v: boolean) => void;
  label: string;
}

export const LabeledCheckBox: SFC<Props> = ({ value, setValue, label, style }) => {
  return (
    <TouchableContainer
      style={style}
      onPress={(): void => setValue(!value)}
      accessibilityRole={"checkbox"}
      activeOpacity={0.8}
    >
      <Text cat="BodyM" color={Colors.TEXT.LIGHT.toString()}>
        {label}
      </Text>
      {value ? (
        <CheckBoxFilled color={Colors.MCHESS_ORANGE.toString()} />
      ) : (
        <CheckBoxEmpty color={Colors.GREY.fade(0.4).toString()} />
      )}
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 8px;
  padding-vertical: 4px;
`;
