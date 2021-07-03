import React from "react";
import { SFC } from "primitives";
import { VariantModal } from "./VariantModal";
import { BoardModal } from "./BoardModal";
import { FormatModal } from "./FormatModal";
import { ModalType, ModalProps } from "./shared";

const MODAL_OPTIONS: { [type in ModalType]: SFC<ModalProps> } = {
  [ModalType.variantModal]: VariantModal,
  [ModalType.boardModal]: BoardModal,
  [ModalType.formatModal]: FormatModal,
};

export const GenericModal: SFC<ModalProps> = ({
  modalInfo,
  setModalInfo,
  gameOptions,
  setGameOptions,
  style,
}) => {
  if (modalInfo.type === undefined) return <></>;
  const ChosenModal = MODAL_OPTIONS[modalInfo.type];

  console.log(modalInfo);

  return (
    <ChosenModal
      modalInfo={modalInfo}
      setModalInfo={setModalInfo}
      gameOptions={gameOptions}
      setGameOptions={setGameOptions}
      style={style}
    />
  );
};
