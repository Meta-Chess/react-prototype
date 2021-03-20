import { View, useWindowDimensions, ScrollView } from "react-native";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, SFC, Text, TextCat, useHover } from "primitives";
import styled from "styled-components/native";
import { TriangleUp } from "./TriangleUp";
import { Styles } from "primitives/Styles";
import { useModals } from "ui/Modals";
import Color from "color";

interface Props {
  label: string;
  details?: string;
  color?: Color;
  textCat?: TextCat;
}

const MODAL_WIDTH = 240;
const TRIANGLE_HEIGHT = 8;

export const LabelWithDetails: SFC<Props> = ({
  label,
  details,
  color = Colors.MCHESS_BLUE,
  textCat = "BodyS",
  style,
}) => {
  const [hoverRef, hovered] = useHover();
  const anchorRef = useRef<View>(null);
  const [modalId] = useState(Math.random());
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [screenSize, setScreenSize] = useState({ screenWidth, screenHeight });

  const safeAreaInsets = useSafeAreaInsets();
  const measure = useCallback(
    (callback: (input: { top: number; left: number }) => void) => {
      anchorRef.current?.measure((_w, _h, px, py, fx, fy) => {
        callback({ top: fy + py, left: px / 2 + fx });
      });
    },
    [anchorRef]
  );

  const modals = useModals();

  const showModal = useCallback(
    (measurements: { top: number; left: number }) => {
      if (details) {
        modals.hideAll();
        modals.show({
          id: modalId + 1,
          content: (
            <ModalContainer
              style={{
                maxHeight:
                  screenHeight -
                  safeAreaInsets.bottom -
                  measurements.top -
                  TRIANGLE_HEIGHT,
              }}
              contentContainerStyle={{ padding: 12 }}
              bounces={false}
            >
              <Text cat={"BodyXS"}>{details}</Text>
            </ModalContainer>
          ),
          top: measurements.top + TRIANGLE_HEIGHT,
          left:
            measurements.left < MODAL_WIDTH / 2 + safeAreaInsets.left
              ? MODAL_WIDTH / 2
              : measurements.left > screenWidth - MODAL_WIDTH / 2 - safeAreaInsets.right
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
    },
    [
      details,
      modalId,
      modals,
      safeAreaInsets.bottom,
      safeAreaInsets.left,
      safeAreaInsets.right,
      screenHeight,
      screenWidth,
    ]
  );

  const hideModal = useCallback(() => {
    modals.hide(modalId);
    modals.hide(modalId + 1);
  }, [modalId, modals]);

  useEffect(() => {
    if (
      screenSize.screenWidth !== screenWidth ||
      screenSize.screenHeight !== screenHeight
    ) {
      hideModal();
      setScreenSize({ screenWidth, screenHeight });
    }
  }, [
    screenWidth,
    screenHeight,
    screenSize.screenWidth,
    screenSize.screenHeight,
    hideModal,
  ]);

  useEffect((): void => {
    if (hovered && !modals.showing(modalId)) {
      measure(showModal);
      setTimeout(() => {
        hideModal();
      }, 10000);
    } else if (modals.showing(modalId)) {
      hideModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  return (
    <>
      <LabelContainer color={color} style={style} ref={hoverRef}>
        <View ref={anchorRef}>
          <Text cat={textCat} selectable={false}>
            {label}
          </Text>
        </View>
      </LabelContainer>
    </>
  );
};

const LabelContainer = styled(View)<{ color: Color; textCat?: TextCat }>`
  border-radius: 4px;
  padding-horizontal: 8px;
  align-items: center;
  align-self: center;
  z-index: 9;
  background-color: ${({ color }): string => color.fade(0.6).toString()};
`;

const ModalContainer = styled(ScrollView)`
  position: absolute;
  width: ${MODAL_WIDTH}px;
  margin-left: ${-MODAL_WIDTH / 2}px;
  z-index: 10;
  background-color: ${Colors.DARKISH.toString()};
  border-radius: 4px;
  ${Styles.BOX_SHADOW}
`;
