import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors, useHover } from "primitives";
import Color from "color";
import { Styles } from "primitives/Styles";

interface Props {
  text: string;
  onPress: () => void;
  backgroundColor?: Color;
  textColor?: Color;
  borderColor?: Color;
  accessibilityLabel?: string; // TODO: make this compulsory
}

export const BaseButton: SFC<Props> = ({
  text,
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
      <Text cat="DisplayS" color={textColor.fade(fade).toString()}>
        {text}
      </Text>
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)<{
  backgroundColor: Color;
  borderColor: Color;
}>`
  padding-horizontal: 24px;
  height: 40px;
  background-color: ${({ backgroundColor }): string => backgroundColor.toString()};
  border: 1px solid ${({ borderColor }): string => borderColor.toString()};
  border-radius: 4px;
  ${({ backgroundColor }): string =>
    backgroundColor.alpha() > 0.5 ? Styles.BOX_SHADOW : ""}
  justify-content: center;
  align-items: center;
`;