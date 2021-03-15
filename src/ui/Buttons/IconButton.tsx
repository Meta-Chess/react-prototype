import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors, useHover } from "primitives";
import Color from "color";

interface Props {
  Icon: FC<{ color?: string }>;
  color?: Color;
  onPress: () => void;
}

export const IconButton: SFC<Props> = ({
  Icon,
  color = Colors.MCHESS_ORANGE,
  ...rest
}) => {
  const [ref, hovered] = useHover();
  const fade = hovered ? 0.1 : 0;
  return (
    <TouchableContainer
      ref={ref}
      activeOpacity={0.5}
      accessibilityRole={"button"}
      style={{
        backgroundColor: hovered ? Colors.GREY.fade(0.9).toString() : "transparent",
      }}
      {...rest}
    >
      <Icon color={color.fade(fade).toString()} />
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
`;
