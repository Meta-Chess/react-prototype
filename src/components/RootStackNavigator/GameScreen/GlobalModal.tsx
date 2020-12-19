import React, { FC, useContext } from "react";
import { View } from "react-native";
import { Colors } from "primitives";
import { GameContext } from "game";
import styled from "styled-components/native";

const GlobalModal: FC = () => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster?.modal?.content) return null;
  const { fullScreen, top, left, content } = gameMaster.modal;

  if (fullScreen) return <FullScreenBackground>{content}</FullScreenBackground>;

  if (!top || !left)
    throw new Error(
      "Modal must have either fullScreen true, or both top and left defined"
    );

  return <View style={{ position: "absolute", top, left }}>{content}</View>;
};

const FullScreenBackground = styled(View)`
  background-color: ${Colors.DARKEST.fade(0.2).toString()};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

export { GlobalModal };
