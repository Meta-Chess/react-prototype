import { TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Colors, SFC, Text } from "primitives";
import styled from "styled-components/native";
import { GameContext } from "game";
import { Triangle } from "./Triangle";

interface Props {
  label: string;
  details?: string;
}

export const LabelWithDetails: SFC<Props> = ({ label, details, style }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, top: 0, left: 0 });
  const { gameMaster } = useContext(GameContext);

  const modalContent = details ? (
    <>
      <Triangle color={Colors.DARKISH.toString()} />
      <ModalContainer>
        <Text cat={"BodyS"}>{details}</Text>
      </ModalContainer>
    </>
  ) : undefined;

  return (
    <>
      <LabelContainer
        style={style}
        disabled={!details}
        onPress={(): void => {
          if (detailsVisible) {
            gameMaster?.hideModal();
          } else {
            gameMaster?.setModal({
              top: dimensions.top + dimensions.height,
              left: dimensions.left + dimensions.width / 2,
              content: modalContent,
              onShow: () => {
                setDetailsVisible(true);
              },
              onHide: () => {
                setDetailsVisible(false);
              },
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
        <Text cat={"BodyM"}>{label}</Text>
      </LabelContainer>
    </>
  );
};

const LabelContainer = styled(TouchableOpacity)`
  border: 2px solid ${Colors.GREY.fade(0.4).toString()};
  border-radius: 50px;
  padding-horizontal: 12px;
  padding-vertical: 4px
  margin-right: 8px;
  margin-top: 12px;
  align-self: flex-start;
  background-color: ${Colors.DARKEST.fade(0.6).toString()};
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
  box-shadow: 0px 1px 4px ${Colors.BLACK.string()};
`;

interface Layout {
  width: number;
  height: number;
  left: number;
  top: number;
}
