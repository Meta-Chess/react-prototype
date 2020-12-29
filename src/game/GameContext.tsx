import React, { createContext, FC, useState, useEffect } from "react";
import { Renderer } from "./Renderer";
import { GameOptions } from "game/types";
import { GameMaster } from "game/GameMaster";
import { useWindowDimensions } from "react-native";
import { OnlineGameMaster } from "game/OnlineGameMaster";

const GameContext = createContext<{ gameMaster?: GameMaster }>({});

interface Props {
  gameOptions?: GameOptions;
  roomId?: string;
}

const GameProvider: FC<Props> = ({ children, gameOptions, roomId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_updateCounter, setUpdateCounter] = useState(0);
  const [gameMaster, setGameMaster] = useState<GameMaster | undefined>();

  const { width, height } = useWindowDimensions();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  if (dimensions.width !== width || dimensions.height !== height) {
    setDimensions({ width, height });
    gameMaster?.hideModal();
  }

  useEffect((): void => {
    const renderer = new Renderer(setUpdateCounter);
    setGameMasterToNewGame({ renderer, setGameMaster, roomId, gameOptions });
  }, [gameOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect((): (() => void) => {
    return (): void => gameMaster?.endGame();
  }, [gameMaster]);

  return <GameContext.Provider value={{ gameMaster }}>{children}</GameContext.Provider>;
};

async function setGameMasterToNewGame({
  renderer,
  setGameMaster,
  roomId,
  gameOptions,
}: {
  renderer: Renderer;
  setGameMaster: (gm: GameMaster | undefined) => void;
  roomId?: string;
  gameOptions?: GameOptions;
}): Promise<void> {
  const newGameMaster =
    gameOptions?.online === true || (gameOptions?.online !== false && roomId)
      ? await OnlineGameMaster.connectNewGame(renderer, gameOptions, roomId)
      : new GameMaster(gameOptions || {}, renderer);
  setGameMaster(newGameMaster);
}

export { GameProvider, GameContext };
