import { GameOptions } from "game";
import { RuleNamesWithParamSettings } from "game/CompactRules";

export interface ModalProps {
  modalInfo: ModalInfo; // generic modal picks a modal depending on modalInfo.type
  setModalInfo: (modalInfo: ModalInfo) => void;
  gameOptions: GameOptions;
  setGameOptions: (gameOptions: GameOptions) => void;
}

export interface ModalInfo {
  type: ModalType | undefined;
  variant?: string;
  ruleSettings?: RuleNamesWithParamSettings;
}

export enum ModalType {
  "variantModal",
  "boardModal",
  "formatModal",
}
