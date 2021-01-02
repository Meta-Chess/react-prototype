import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors, useHover } from "primitives";
import Color from "color";

interface Props {
  Icon: FC<{ color: string }>;
  color?: Color;
  onPress: () => void;
}

export const IconButton: SFC<Props> = ({
  Icon,
  color = Colors.MCHESS_ORANGE,
  ...rest
}) => {
  const [ref, hovered] = useHover();
  const fade = hovered ? 0.3 : 0;
  return (
    <TouchableContainer
      ref={ref}
      activeOpacity={0.5}
      accessibilityRole={"button"}
      {...rest}
    >
      <Icon color={color.fade(fade).toString()} />
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)`
  width: 24px;
  height: 24px;
`;
