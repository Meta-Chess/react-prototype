import React, { FC, useContext } from "react";
import { GameContext } from "game";
import { View } from "react-native";

const GlobalModal: FC = () => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster?.modal) return null;
  const { top, left, content } = gameMaster.modal;

  return <View style={{ position: "absolute", top, left }}>{content}</View>;
};
export { GlobalModal };
