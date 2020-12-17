import { TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Colors, SFC, Text } from "primitives";
import styled from "styled-components/native";
import { GameContext } from "game";
import { Triangle } from "./Triangle";
import { Styles } from "primitives/Styles";

interface Props {
  label: string;
  details?: string;
}

export const LabelWithDetails: SFC<Props> = ({ label, details, style }) => {
  const [modalId] = useState(Math.random());
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, top: 0, left: 0 });
  const { gameMaster } = useContext(GameContext);

  const modalContent = details ? (
    <>
      <Triangle color={Colors.DARKISH.toString()} />
      <ModalContainer>
        <Text cat={"BodyXS"}>{details}</Text>
      </ModalContainer>
    </>
  ) : undefined;

  return (
    <>
      <LabelContainer
        style={style}
        disabled={!details}
        onPress={(): void => {
          if (gameMaster?.modal?.id === modalId) {
            gameMaster?.hideModal();
          } else {
            gameMaster?.setModal({
              id: modalId,
              top: dimensions.top + dimensions.height,
              left: dimensions.left + dimensions.width / 2,
              content: modalContent,
            });
          }
        }}
        onLayout={(event): void => {
          const { width, height, top, left } = (event.nativeEvent
            .layout as unknown) as Layout;
          if (
            dimensions.width !== width ||
            dimensions.height !== height ||
            dimensions.top !== top ||
            dimensions.left !== left
          )
            setDimensions({ width, height, top, left });
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
  background-color: ${Colors.MCHESS_BLUE.fade(0.8).toString()};
`;

const ModalContainer = styled(View)`
  position: absolute;
  width: 240px;
  margin-left: -120px;
  margin-top: 10px;
  z-index: 10;
  padding: 12px;
  background-color: ${Colors.DARKISH.toString()};
  border-radius: 4px;
  ${Styles.BOX_SHADOW}
`;

interface Layout {
  width: number;
  height: number;
  left: number;
  top: number;
}
