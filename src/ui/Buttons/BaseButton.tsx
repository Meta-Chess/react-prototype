import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors, useHover } from "primitives";
import Color from "color";
import { ButtonContent } from "ui/Buttons/ButtonContent";

interface Props {
  label: string | FC<{ color?: string }>;
  onPress: () => void;
  backgroundColor?: Color;
  labelColor?: Color;
  borderColor?: Color;
  borderWidth?: number;
  disabled?: boolean;
  accessibilityLabel?: string; // TODO: make this compulsory
}

export const BaseButton: SFC<Props> = ({
  label,
  disabled,
  backgroundColor = disabled ? Colors.GREY : Colors.MCHESS_ORANGE,
  labelColor = Colors.TEXT.DARK,
  borderColor = disabled ? Colors.GREY : Colors.MCHESS_ORANGE,
  borderWidth = 1,
  ...rest
}) => {
  const [ref, hovered] = useHover();
  const fade = !disabled && hovered ? (backgroundColor.alpha() > 0.5 ? 0.15 : 0.3) : 0;
  return (
    <TouchableContainer
      ref={ref}
      backgroundColor={backgroundColor.fade(fade)}
      borderColor={borderColor.fade(fade)}
      borderWidth={borderWidth}
      activeOpacity={0.5}
      disabled={disabled}
      accessibilityRole={"button"}
      {...rest}
    >
      <ButtonContent Label={label} color={labelColor.fade(fade)} />
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)<{
  backgroundColor: Color;
  borderColor: Color;
  borderWidth: number;
}>`
  padding-horizontal: ${({ borderWidth }): number => 16 - borderWidth}px;
  height: 36px;
  background-color: ${({ backgroundColor }): string => backgroundColor.toString()};
  border: ${({ borderWidth }): number => borderWidth}px solid
    ${({ borderColor }): string => borderColor.toString()};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;
