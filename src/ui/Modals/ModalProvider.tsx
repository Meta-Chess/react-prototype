import React, {
  createContext,
  FC,
  useState,
  useMemo,
  ReactNode,
  useContext,
} from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";

const defaultModalController = {
  show: (_modal: Modal): void => {
    throw new Error("Not implementd");
  },
  hide: (_modalId: number): void => {
    throw new Error("Not implemented");
  },
  hideAll: (): void => {
    throw new Error("Not implemented");
  },
  showing: (_modalId: number): boolean => {
    throw new Error("Not implemented");
  },
};

const ModalContext = createContext(defaultModalController);

export interface Modal {
  id: number;
  top?: number;
  left?: number;
  content: ReactNode;
}

export const ModalProvider: FC = ({ children }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const contextMethods = useMemo(() => {
    function show(modal: Modal): void {
      setModals((modals) => [...modals, modal]);
    }
    function hide(modalId: number): void {
      setModals((modals) => modals.filter((modal) => modal.id !== modalId));
    }
    function hideAll(): void {
      setModals([]);
    }
    function showing(modalId: number): boolean {
      return modals.some((modal) => modal.id === modalId);
    }
    return { show, hide, hideAll, showing };
  }, [modals]);

  return (
    <ModalContext.Provider value={contextMethods}>
      {children}
      {modals.map((modal) => (
        // TODO: Pressable background for full screen modals - maybe upgrade react-native and use pressable?
        <ModalContainer key={modal.id} top={modal.top} left={modal.left}>
          {modal.content}
        </ModalContainer>
      ))}
    </ModalContext.Provider>
  );
};

const ModalContainer = styled(View)<{ top?: number; left?: number }>`
  position: absolute;
  ${({ top, left }): string =>
    top === undefined && left === undefined
      ? `top: 0; left: 0; bottom: 0; right: 0; 
      background-color: ${Colors.DARKEST.fade(0.4).toString()}
      align-items: center;
      justify-content: center;`
      : `top: ${top}px; left: ${left}px`}
`;

export function useModals(): typeof defaultModalController {
  return useContext(ModalContext);
}
