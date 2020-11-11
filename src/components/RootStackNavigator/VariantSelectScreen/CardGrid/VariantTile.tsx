import React from "react";
import { VariantTileButton } from "ui/Buttons/VariantTileButton";
import { SFC } from "primitives";
import { FutureVariantName, futureVariants } from "game/variants";

interface Props {
  onPress: () => void;
  text: FutureVariantName;
  selected: boolean;
}
/// return to start screen
const VariantTile: SFC<Props> = ({ text, style, selected, onPress }) => {
  return (
    <VariantTileButton
      onPress={onPress}
      variant={futureVariants[text]}
      style={style}
      selected={selected}
    />
  );
};

export { VariantTile };
