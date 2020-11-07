import React from "react";
import { VariantTileButton } from "ui/Buttons";
import { SFC } from "primitives";
import { FutureVariantName, futureVariants } from "game/variants";

interface Props {
  onPress: () => void;
  text: FutureVariantName;
}
/// return to start screen
const VariantTile: SFC<Props> = ({ text, style, onPress }) => {
  return (
    <VariantTileButton onPress={onPress} variant={futureVariants[text]} style={style} />
  );
};

export { VariantTile };
