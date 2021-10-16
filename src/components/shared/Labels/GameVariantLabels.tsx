import React, { FC } from "react";
import { Colors } from "primitives";
import { VariantLabel, NoCheckLabel } from "components/shared/Labels";
import Color from "color";
import { GameMaster, GameOptions } from "game";
import {
  futureVariants as allVariants,
  FutureVariant,
  FutureVariantName,
} from "game/variants";
import { VariantLabelInfo } from "game/types";
import { boardVariants as allBoardVariants } from "game/boards";

const VARIANT_LABEL_COLORS: { [key in VariantLabelInfo]: Color } = {
  [VariantLabelInfo.VariantLeaving]: Colors.HIGHLIGHT.ERROR,
  [VariantLabelInfo.NewVariant]: Colors.HIGHLIGHT.SUCCESS,
};

function getNonBoardVariants(
  variants: FutureVariantName[] | undefined
): FutureVariant[] | undefined {
  if (variants === undefined) return undefined;

  return variants
    .filter((name) => !(name in allBoardVariants))
    .map((name) => allVariants[name]);
}

function getBoardVariants(
  variants: FutureVariantName[] | undefined
): FutureVariant[] | undefined {
  if (variants === undefined) return undefined;

  return variants
    .filter((name) => name in allBoardVariants)
    .map((name) => allVariants[name]);
}

interface Props {
  givenGameOptions?: GameOptions;
  gameMaster?: GameMaster;
  marginTop: number;
}

export const GameVariantLabels: FC<Props> = ({
  givenGameOptions,
  gameMaster,
  marginTop,
}) => {
  const currentBaseVariants = gameMaster?.getVariantNames();
  const variants =
    getNonBoardVariants(givenGameOptions?.baseVariants) ??
    getNonBoardVariants(currentBaseVariants);
  const boardVariants =
    getBoardVariants(givenGameOptions?.baseVariants) ??
    getBoardVariants(currentBaseVariants);
  const noCheck =
    !givenGameOptions?.checkEnabled ?? !gameMaster?.getRuleNames().includes("check");
  const ruleNamesWithParams =
    givenGameOptions?.ruleNamesWithParams ?? gameMaster?.gameOptions.ruleNamesWithParams;

  if (variants === undefined || boardVariants === undefined || noCheck === undefined)
    return <></>;
  return (
    <>
      {boardVariants.map((variant) => (
        <VariantLabel
          key={variant.title}
          variant={variant}
          ruleNamesWithParams={ruleNamesWithParams}
          color={Colors.GREY}
          style={{ marginRight: 4, marginTop: marginTop }}
        />
      ))}
      {noCheck && <NoCheckLabel style={{ marginRight: 4, marginTop: marginTop }} />}
      {variants.map((variant, index) => (
        <VariantLabel
          key={variant.title}
          variant={variant}
          ruleNamesWithParams={ruleNamesWithParams}
          color={
            gameMaster
              ? VARIANT_LABEL_COLORS[gameMaster.formatVariantLabelColors[index]]
              : undefined
          }
          style={{ marginRight: 4, marginTop: marginTop }}
        />
      ))}
    </>
  );
};
