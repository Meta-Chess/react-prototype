import React from "react";
import { SFC, TextCat } from "primitives";
import { LabelWithDetails } from "ui";
import { FutureVariant } from "game/variants";
import { RuleNamesWithParams } from "game/CompactRules";
import {
  doesGameOptionsModifyVariant,
  getGameOptionParamsForVariant,
} from "game/variantAndRuleProcessing";
import Color from "color";

interface Props {
  variant: FutureVariant;
  ruleNamesWithParams: RuleNamesWithParams;
  color?: Color | undefined;
  textCat?: TextCat | undefined;
  noHover?: boolean;
  onPress?: (() => void) | undefined;
}

export const VariantLabel: SFC<Props> = ({
  variant,
  ruleNamesWithParams,
  color = undefined,
  textCat = undefined,
  noHover = false,
  onPress = undefined,
  style,
}) => {
  let showModifiedGear = false;
  let details = variant.shortDescription;
  if (doesGameOptionsModifyVariant(variant, ruleNamesWithParams)) {
    showModifiedGear = true;
    getGameOptionParamsForVariant(variant, ruleNamesWithParams).forEach((param) => {
      details = details + "\n- " + Object.keys(param)[0] + ": " + Object.values(param)[0];
    });
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
