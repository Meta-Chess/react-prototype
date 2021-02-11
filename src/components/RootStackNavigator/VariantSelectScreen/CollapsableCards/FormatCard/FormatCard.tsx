import React from "react";
import { SFC } from "primitives";
import { FutureVariantName } from "game";
import { VariantCompositionCard } from "./VariantCompositionCard";
import { RandomVariantsCard } from "./RandomVariantsCard";
import { RollingVariantsCard } from "./RollingVariantsCard";
import { CurrentCardProps } from "./CurrentCardProps";
import { FormatType } from "components/RootStackNavigator/VariantSelectScreen"; //temp

interface Props {
  selectedFormat: FormatType;
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
}

const formatCardMap: {
  [id: string]: React.FC<CurrentCardProps>;
} = {
  "Variant Composition": VariantCompositionCard,
  "Random Variants": RandomVariantsCard,
  "Rolling Variants": RollingVariantsCard,
};

const FormatCard: SFC<Props> = ({
  selectedFormat,
  selectedVariants,
  setSelectedVariants,
}) => {
  const CurrentCard = formatCardMap[selectedFormat];
  return (
    <CurrentCard
      selectedVariants={selectedVariants}
      setSelectedVariants={setSelectedVariants}
    />
  );
};

export { FormatCard };
