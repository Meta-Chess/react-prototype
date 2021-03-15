import React from "react";
import { Colors, LinkIcon, SFC } from "primitives";
import { Block } from "ui";
import copy from "copy-to-clipboard";
import { IconButton } from "ui/Buttons/IconButton";

interface Props {
  roomId?: string;
}

const RoomIdCard: SFC<Props> = ({ roomId, style }) => {
  if (!roomId) return null;
  return (
    <Block
      title={`Invite key: ${roomId}`}
      withTitle={
        <IconButton
          Icon={LinkIcon}
          color={Colors.WHITE.fade(0.4)}
          onPress={(): void => copy(`mchess.io/game/${roomId}`)}
        />
      }
      style={style}
    />
  );
};

export { RoomIdCard };
