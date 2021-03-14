import React from "react";
import { SFC } from "primitives";
import { Block } from "ui";

interface Props {
  roomId?: string;
}

const RoomIdCard: SFC<Props> = ({ roomId, style }) => {
  if (!roomId) return null;
  return <Block title={`Invite key: ${roomId}`} style={style} />;
};

export { RoomIdCard };
