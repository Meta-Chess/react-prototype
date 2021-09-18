import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SFC, Colors, useHover } from "primitives";
import styled from "styled-components/native";

interface Props {
  onPress: () => void;
  Icon: React.FC<{ size?: number; color?: string }>;
}
export const TileAdvancedMenuButton: SFC<Props> = ({ onPress, Icon, style }) => {
  const [ref, hovered] = useHover();

  return (
    <ButtonContainer>
      <TouchableOpacity style={style} ref={ref} onPress={onPress}>
        <Icon
          size={60}
          color={
            hovered
              ? Colors.TEXT.LIGHT_SECONDARY.fade(0.7).toString()
              : Colors.TEXT.LIGHT_SECONDARY.toString()
          }
        />
      </TouchableOpacity>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
