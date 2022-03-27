import React from "react";
import { SFC } from "primitives";
import { LabelWithDetails } from "ui";
import { traitInfo, TraitName } from "game/variants/traitInfo";

interface Props {
  trait: TraitName;
}

export const TraitLabel: SFC<Props> = ({ trait, style }) => {
  return (
    <LabelWithDetails
      label={trait}
      textCat={"BodyS"}
      details={traitInfo[trait].description}
      color={traitInfo[trait].color}
      style={style}
    />
  );
};
