import React from "react";
import { TouchableOpacity } from "react-native";
import { SFC, Colors } from "primitives";
import { PieceName } from "game/types";
import { PieceImage } from "primitives";

interface Props {
  onPress: () => void;
  disabled: boolean;
  pieceName: PieceName;
  size: number;
}

export const PieceButton: SFC<Props> = ({
  onPress,
  disabled,
  pieceName,
  size,
  style,
}) => {
  const enabledColor = Colors.MCHESS_BLUE.mix(Colors.GREY, 0.3).toString();
  const disabledColor = Colors.MCHESS_BLUE.mix(Colors.GREY, 0.9).toString();

  return (
    <TouchableOpacity {...{ onPress, disabled, style }}>
      <PieceImage
        type={pieceName}
        color={disabled ? disabledColor : enabledColor}
        outlineColor={disabled ? disabledColor : enabledColor}
        size={size}
      />
    </TouchableOpacity>
  );
};
