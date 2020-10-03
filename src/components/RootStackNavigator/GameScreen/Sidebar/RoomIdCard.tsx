import React, { FC } from "react";
import { Text } from "primitives";
import { Card } from "ui";

interface Props {
  roomId?: string;
}

const RoomIdCard: FC<Props> = ({ roomId }) => {
  if (!roomId) return null;
  return (
    <Card>
      <Text cat="DisplayL">{`Invite key: ${roomId}`}</Text>
    </Card>
  );
};

export { RoomIdCard };
