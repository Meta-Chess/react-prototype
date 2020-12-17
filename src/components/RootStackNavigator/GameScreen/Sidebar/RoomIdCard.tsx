import React from "react";
import { SFC, Text } from "primitives";
import { Card } from "ui";

interface Props {
  roomId?: string;
}

const RoomIdCard: SFC<Props> = ({ roomId, style }) => {
  if (!roomId) return null;
  return (
    <Card style={style}>
      <Text cat="DisplayM">{`Invite key: ${roomId}`}</Text>
    </Card>
  );
};

export { RoomIdCard };
