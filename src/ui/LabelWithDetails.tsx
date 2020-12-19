import { TouchableOpacity, View, Platform, useWindowDimensions } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import { Colors, SFC, Text } from "primitives";
import styled from "styled-components/native";
import { TriangleUp } from "./TriangleUp";
import { Styles } from "primitives/Styles";
import { useModals } from "ui/Modals";
import { sleep } from "utilities";

interface Props {
  label: string;
  details?: string;
}

const MODAL_WIDTH = 240;
const TRIANGLE_HEIGHT = 8;

export const LabelWithDetails: SFC<Props> = ({ label, details, style }) => {
  const anchorRef = useRef<TouchableOpacity>(null);
  const [modalId] = useState(Math.random());
  const { width: screenWidth } = useWindowDimensions();
  const [measurements, setMeasurements] = useState({ top: 0, left: 0 });
  const measure = useCallback(() => {
    anchorRef.current?.measure((width, height, px, py, fx, fy) => {
      setMeasurements({ top: fy + py, left: px / 2 + fx });
    });
  }, [anchorRef]);

  const modals = useModals();
  const showModal = useCallback(() => {
    if (details) {
      modals.hideAll();
      modals.show({
        id: modalId + 1,
        content: (
          <ModalContainer>
            <Text cat={"BodyXS"}>{details}</Text>
          </ModalContainer>
        ),
        top: measurements.top + TRIANGLE_HEIGHT,
        left:
          measurements.left < MODAL_WIDTH / 2
            ? MODAL_WIDTH / 2
            : measurements.left > screenWidth - MODAL_WIDTH / 2
            ? screenWidth - MODAL_WIDTH / 2
            : measurements.left,
      });
      modals.show({
        id: modalId,
        content: (
          <TriangleUp
            color={Colors.DARKISH.toString()}
            width={16}
            height={TRIANGLE_HEIGHT}
          />
        ),
        ...measurements,
      });
    }
  }, [measurements, details, modalId, modals, screenWidth]);

  const hideModal = useCallback(() => {
    modals.hide(modalId);
  }, [modalId, modals]);

  return (
    <>
      <LabelContainer
        style={style}
        disabled={!details}
        onPress={(): void => {
          if (modals.showing(modalId)) {
            hideModal();
          } else {
            measure();
            showModal();
          }
        }}
        ref={anchorRef}
        onLayout={async (): Promise<void> => {
          if (Platform.OS !== "web") await sleep(300);
          measure();
          if (modals.showing(modalId)) {
            hideModal();
            showModal();
          }
        }}
      >
        <Text cat={"BodyS"}>{label}</Text>
      </LabelContainer>
    </>
  );
};

const LabelContainer = styled(TouchableOpacity)`
  border-radius: 4px;
  padding-horizontal: 8px;
  margin-right: 4px;
  margin-top: 4px;
  align-self: flex-start;
  align-items: center;
  background-color: ${Colors.MCHESS_BLUE.fade(0.8).toString()};
`;

const ModalContainer = styled(View)`
  position: absolute;
  width: ${MODAL_WIDTH}px;
  margin-left: ${-MODAL_WIDTH / 2}px;
  z-index: 10;
  padding: 12px;
  background-color: ${Colors.DARKISH.toString()};
  border-radius: 4px;
  ${Styles.BOX_SHADOW}
`;
