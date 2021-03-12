import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors, useHover } from "primitives";
import Color from "color";

interface Props {
  label: ReactNode;
  onPress: () => void;
  backgroundColor?: Color;
  textColor?: Color;
  borderColor?: Color;
  accessibilityLabel?: string; // TODO: make this compulsory
}

export const BaseButton: SFC<Props> = ({
  label,
  backgroundColor = Colors.MCHESS_ORANGE,
  textColor = Colors.TEXT.DARK,
  borderColor = Colors.MCHESS_ORANGE,
  ...rest
}) => {
  const [ref, hovered] = useHover();
  const fade = hovered ? (backgroundColor.alpha() > 0.5 ? 0.15 : 0.3) : 0;
  return (
    <TouchableContainer
      ref={ref}
      backgroundColor={backgroundColor.fade(fade)}
      borderColor={borderColor.fade(fade)}
      activeOpacity={0.5}
      accessibilityRole={"button"}
      {...rest}
    >
      {typeof label === "string" ? (
        <Text cat="DisplayXS" color={textColor.fade(fade).toString()}>
          {label}
        </Text>
      ) : (
        label
      )}
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)<{
  backgroundColor: Color;
  borderColor: Color;
}>`
  padding-horizontal: 16px;
  height: 36px;
  background-color: ${({ backgroundColor }): string => backgroundColor.toString()};
  border: 1px solid ${({ borderColor }): string => borderColor.toString()};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;
