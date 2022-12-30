import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors, SFC, Text, TextCat } from "primitives";
import styled from "styled-components/native";
import { TextIcon } from "ui";
import Color from "color";
import { GearIcon } from "primitives/icons";
import { Tooltip } from "ui/Tooltip";

interface Props {
  label: string;
  details?: string;
  color?: Color;
  textCat?: TextCat;
  noHover?: boolean;
  showModifiedGear?: boolean;
  onPress?: (() => void) | undefined;
}

export const LabelWithDetails: SFC<Props> = ({
  label,
  details,
  color = Colors.MCHESS_BLUE,
  textCat = "BodyS",
  noHover = false,
  onPress = undefined,
  showModifiedGear = false,
  style,
}) => {
  return (
    <Tooltip content={noHover ? undefined : details} maxWidth={240}>
      <LabelContainer
        color={color}
        style={style}
        disabled={onPress === undefined}
        onPress={onPress}
      >
        <Text cat={textCat} selectable={false}>
          {label}
        </Text>
        {showModifiedGear && (
          <View style={{ marginLeft: 4, justifyContent: "center" }}>
            <TextIcon Icon={GearIcon} />
          </View>
        )}
      </LabelContainer>
    </Tooltip>
  );
};

const LabelContainer = styled(TouchableOpacity)<{ color: Color }>`
  border-radius: 4px;
  padding-horizontal: 8px;
  align-items: center;
  align-self: center;
  z-index: 9;
  background-color: ${({ color }): string => color.fade(0.6).toString()};
`;
