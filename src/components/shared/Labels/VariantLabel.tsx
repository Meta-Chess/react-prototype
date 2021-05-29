import React from "react";
import { SFC, TextCat } from "primitives";
import { LabelWithDetails } from "ui";
import { FutureVariant } from "game/variants";
import { RuleNamesWithParams } from "game/CompactRules";
import Color from "color";
import { getVariantLabelFromParams } from "./getVariantLabelFromParams";

interface Props {
  variant: FutureVariant;
  ruleNamesWithParams?: RuleNamesWithParams;
  color?: Color | undefined;
  textCat?: TextCat | undefined;
  noHover?: boolean;
  onPress?: (() => void) | undefined;
}

export const VariantLabel: SFC<Props> = ({
  variant,
  ruleNamesWithParams = undefined,
  color = undefined,
  textCat = undefined,
  noHover = false,
  onPress = undefined,
  style,
}) => {
  let showModifiedGear = false;
  let details = variant.shortDescription;
  const moreDetails = getVariantLabelFromParams(variant, ruleNamesWithParams);

  if (moreDetails !== "") {
    showModifiedGear = true;
    details += moreDetails;
  }

  return (
    <LabelWithDetails
      label={variant.title}
      details={details}
      key={variant.title}
      color={color}
      textCat={textCat}
      noHover={noHover}
      onPress={onPress}
      showModifiedGear={showModifiedGear}
      style={style}
    />
  );
};
