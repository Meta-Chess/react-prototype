import React, { FC, useContext } from "react";
import { Text } from "primitives";
import { GameContext } from "game";

const RoomIdDisplay: FC = () => {
  const { gameMaster } = useContext(GameContext);
  const roomId = gameMaster?.roomId;
  if (!roomId) return null;
  return <Text cat="DisplayL">{roomId}</Text>;
};
export { RoomIdDisplay };
