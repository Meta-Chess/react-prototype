import React from "react";
import { SFC } from "primitives";
import { Card } from "ui";

interface Props {
  roomId?: string;
}

const RoomIdCard: SFC<Props> = ({ roomId, style }) => {
  if (!roomId) return null;
  return <Card title={`Invite key: ${roomId}`} style={style} />;
};

export { RoomIdCard };
