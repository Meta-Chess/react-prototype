import React, { createContext, FC, useState, useEffect } from "react";
import { Game } from "./Game";
import { Renderer } from "./Renderer";
import { GameOptions } from "game/types";

const GameContext = createContext<{ game?: Game }>({});

interface Props {
  gameOptions: GameOptions;
  gameId: number;
}

const GameProvider: FC<Props> = ({ children, gameOptions, gameId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_updateCounter, setUpdateCounter] = useState(0);
  const [g, setG] = useState<Game | undefined>();

  useEffect(() => {
    const newGame = gameOptions
      ? Game.createGame({
          gameOptions,
          renderer: new Renderer(setUpdateCounter),
        })
      : undefined;
    setG(newGame);
  }, [gameId]); // eslint-disable-line react-hooks/exhaustive-deps

  return <GameContext.Provider value={{ game: g }}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
