import React, { FC } from "react";
import { JoinDiscordButton } from "ui";

export const EmptyLobby: FC = () => {
  return (
    <>
      <JoinDiscordButton
        buttonText={"There are players in the Community Discord\nClick to join!"}
      />
    </>
  );
};
