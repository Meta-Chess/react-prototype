import { FutureVariantName, GameOptions } from "game";
import { RuleNamesWithParamSettings } from "game/CompactRules";

export interface ModalProps {
  modalInfo?: ModalInfo; // generic modal picks a modal depending on modalInfo.type
  setModalInfo: (modalInfo: ModalInfo) => void;
  gameOptions: GameOptions;
  setGameOptions: (gameOptions: GameOptions) => void;
  selectedVariants?: FutureVariantName[];
  setSelectedVariants?: (x: FutureVariantName[]) => void;
}

export interface ModalInfo {
  type: ModalType | undefined;
  variant?: string;
  ruleSettings?: RuleNamesWithParamSettings;
  format?: string;
  formatSettings?: undefined;
}

export enum ModalType {
  "variantModal",
  "boardModal",
  "formatModal",
}
