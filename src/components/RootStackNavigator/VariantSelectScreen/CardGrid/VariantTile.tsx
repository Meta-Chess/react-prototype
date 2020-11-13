import React from "react";
import { VariantTileButton } from "ui/Buttons/VariantTileButton";
import { SFC } from "primitives";
import { FutureVariantName, futureVariants } from "game/variants";

interface Props {
  onPress: () => void;
  text: FutureVariantName;
  selected: boolean;
  clash: boolean;
}
/// return to start screen
const VariantTile: SFC<Props> = ({ text, style, selected, clash, onPress }) => {
  return (
    <VariantTileButton
      onPress={onPress}
      variant={futureVariants[text]}
      style={style}
      selected={selected}
      clash={clash}
    />
  );
};

export { VariantTile };
