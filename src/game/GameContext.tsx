import React, { createContext, FC, useState, useEffect } from "react";
import { Renderer } from "./Renderer";
import { GameOptions } from "game/types";
import { GameMaster } from "game/GameMaster";

const GameContext = createContext<{ gameMaster?: GameMaster }>({});

interface Props {
  gameOptions: GameOptions;
}

const GameProvider: FC<Props> = ({ children, gameOptions }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_updateCounter, setUpdateCounter] = useState(0);
  const [gameMaster, setGameMaster] = useState<GameMaster | undefined>();

  useEffect((): (() => void) => {
    const newGameMaster = gameOptions
      ? new GameMaster(gameOptions, new Renderer(setUpdateCounter))
      : undefined;
    setGameMaster(newGameMaster);
    return (): void => newGameMaster?.endGame();
  }, [gameOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  return <GameContext.Provider value={{ gameMaster }}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
