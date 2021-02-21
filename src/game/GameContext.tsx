import React, { createContext, FC, useState, useEffect } from "react";
import { Renderer } from "./Renderer";
import { GameOptions } from "game/types";
import { GameMaster } from "game/GameMaster";
import { OnlineGameMaster } from "game/OnlineGameMaster";
import { User, useUser } from "auth/UserProvider";

export const GameContext = createContext<{ gameMaster?: GameMaster }>({});

interface SimpleProps {
  gameMaster: GameMaster;
}

export const SimpleGameProvider: FC<SimpleProps> = ({ children, gameMaster }) => {
  useEffect((): (() => void) => {
    return (): void => {
      if (gameMaster instanceof OnlineGameMaster) gameMaster.disconnect();
    };
  }, [gameMaster]);

  return <GameContext.Provider value={{ gameMaster }}>{children}</GameContext.Provider>;
};

interface Props {
  gameOptions?: GameOptions;
  roomId?: string;
}

export const GameProvider: FC<Props> = ({ children, gameOptions, roomId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_updateCounter, setUpdateCounter] = useState(0);
  const [gameMaster, setGameMaster] = useState<GameMaster | undefined>();
  const { user } = useUser();

  useEffect((): void => {
    const renderer = new Renderer(setUpdateCounter);
    setGameMasterToNewGame({ renderer, setGameMaster, roomId, gameOptions, user });
  }, [gameOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect((): (() => void) => {
    return (): void => {
      if (gameMaster instanceof OnlineGameMaster) gameMaster.disconnect();
    };
  }, [gameMaster]);

  return <GameContext.Provider value={{ gameMaster }}>{children}</GameContext.Provider>;
};

async function setGameMasterToNewGame({
  renderer,
  setGameMaster,
  roomId,
  gameOptions,
  user,
}: {
  renderer: Renderer;
  setGameMaster: (gm: GameMaster | undefined) => void;
  roomId?: string;
  gameOptions?: GameOptions;
  user: User;
}): Promise<void> {
  const newGameMaster =
    gameOptions?.online === true || (gameOptions?.online !== false && roomId)
      ? await OnlineGameMaster.connectNewGame(renderer, user, gameOptions, roomId)
      : new GameMaster(...GameMaster.processConstructorInputs(gameOptions, renderer));
  setGameMaster(newGameMaster);
}
