import React from "react";
import { View } from "react-native";
import { PreviewIcon, useHover, SFC, Colors, HoverRef } from "primitives";

interface Props {
  hoverRef: HoverRef;
  hovered: boolean;
}

export const HoverPreviewIcon: SFC<Props> = ({ hoverRef, hovered, style }) => {
  return (
    <View style={style} ref={hoverRef}>
      <PreviewIcon
        color={
          hovered
            ? Colors.TEXT.LIGHT_SECONDARY.fade(0.7).toString()
            : Colors.TEXT.LIGHT_SECONDARY.toString()
        }
      />
    </View>
  );
};
