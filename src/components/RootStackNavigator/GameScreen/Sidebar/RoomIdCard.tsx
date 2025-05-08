import React from "react";
import { Colors, LinkIcon, SFC } from "primitives";
import { Block } from "ui";
import copy from "copy-to-clipboard";
import { IconButton } from "ui/Buttons/IconButton";
import { Screens, useRoute } from "navigation";
import { getSpaceFromRouteName } from "navigation/Spaces";

interface Props {
  roomId?: string;
}

const getShareUrl = (routeName: Screens, roomId: string): string => {
  const baseUrl = "mchess.io";
  const space = getSpaceFromRouteName(routeName);
  return space ? `${baseUrl}/${space}/game/${roomId}` : `${baseUrl}/game/${roomId}`;
};

const RoomIdCard: SFC<Props> = ({ roomId, style }) => {
  const route = useRoute();

  if (!roomId) return null;

  return (
    <Block
      title={`Invite key: ${roomId}`}
      withTitle={
        <IconButton
          Icon={LinkIcon}
          color={Colors.WHITE.fade(0.4)}
          onPress={(): void => {
            copy(getShareUrl(route.name, roomId));
          }}
        />
      }
      style={style}
    />
  );
};

export { RoomIdCard };
