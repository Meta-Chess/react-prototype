import React from "react";
import { GameOptions } from "game";
import { CollapsableCard } from "ui/Containers";
import { ModalGearButton } from "ui/Pressable";
import { SFC, HoverRef } from "primitives";
import { FutureVariantName } from "game";
import { RuleNamesWithParams } from "game/CompactRules";
import {
  ModalInfo,
  ModalType,
} from "components/RootStackNavigator/VariantSelectScreen/Modals/shared";
import { getVariantsSelectedBoard } from "game/variantAndRuleProcessing/boardTypeProcessing";
import { HoverPreviewIcon } from "./HoverPreviewIcon";
interface Props {
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  gameOptions: GameOptions;
  setGameOptions: (x: GameOptions) => void;
  modalInfo: ModalInfo;
  setModalInfo: (x: ModalInfo) => void;
  boardPreviewRef: HoverRef;
  boardPreviewHover: boolean;
  ruleNamesWithParams?: RuleNamesWithParams;
}

const BoardCard: SFC<Props> = ({
  selectedVariants,
  gameOptions,
  modalInfo,
  setModalInfo,
  boardPreviewRef,
  boardPreviewHover,
}) => {
  const playerNumber = gameOptions.numberOfPlayers;
  return (
    <CollapsableCard
      title={
        "Board - " +
        getVariantsSelectedBoard(selectedVariants).title +
        " " +
        playerNumber.toString() +
        "P"
      }
      titleComponent={
        <HoverPreviewIcon hoverRef={boardPreviewRef} hovered={boardPreviewHover} />
      }
      endComponent={
        <ModalGearButton
          customModalInfo={{
            type: ModalType.boardModal,
          }}
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
        />
      }
      defaultState={false}
      collapsable={false}
    />
  );
};

export { BoardCard };
