import React, { FC } from "react";
import { SFC } from "primitives";
import { FormatName } from "game/formats";
import {
  VariantCompositionIcon,
  RandomVariantsIcon,
  RollingVariantsIcon,
} from "primitives";

export const FORMAT_ICONS: { [key in FormatName]: FC } = {
  variantComposition: VariantCompositionIcon,
  randomVariants: RandomVariantsIcon,
  rollingVariants: RollingVariantsIcon,
};

interface Props {
  format: FormatName;
}

export const FormatIcon: SFC<Props> = ({ format }) => {
  const Icon = FORMAT_ICONS[format];
  return <Icon />;
};
