import React, { createContext, FC, useState, useEffect } from "react";
import { Renderer } from "./Renderer";
import { GameOptions } from "game/types";
import { GameMaster } from "game/GameMaster";
import { useWindowDimensions } from "react-native";
import { OnlineGameMaster } from "game/OnlineGameMaster";

const GameContext = createContext<{ gameMaster?: GameMaster }>({});

interface Props {
  gameOptions: GameOptions;
}

const GameProvider: FC<Props> = ({ children, gameOptions }) => {
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
    // TODO: Extract this to a factory function
    const renderer = new Renderer(setUpdateCounter);
    setGameMasterToNewGame(gameOptions, renderer, setGameMaster);
  }, [gameOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect((): (() => void) => {
    return (): void => gameMaster?.endGame();
  }, [gameMaster]);

  return <GameContext.Provider value={{ gameMaster }}>{children}</GameContext.Provider>;
};

async function setGameMasterToNewGame(
  gameOptions: GameOptions,
  renderer: Renderer,
  setGameMaster: (gm: GameMaster | undefined) => void
): Promise<void> {
  const newGameMaster = gameOptions
    ? gameOptions.online
      ? await OnlineGameMaster.connectNewGame(renderer, gameOptions)
      : new GameMaster(gameOptions, renderer)
    : undefined;
  setGameMaster(newGameMaster);
}

export { GameProvider, GameContext };
