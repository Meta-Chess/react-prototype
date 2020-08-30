import React, { createContext, FC, useState, useEffect } from "react";
import { Game } from "./Game";
import { Renderer } from "./Renderer";
import { VariantName } from "game/variants";

const GameContext = createContext<{ game?: Game }>({});

interface Props {
  variant: VariantName;
  gameId: number;
}

const GameProvider: FC<Props> = ({ children, variant, gameId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_updateCounter, setUpdateCounter] = useState(0);
  const [g, setG] = useState<Game | undefined>();

  useEffect(() => {
    const newGame = variant
      ? Game.createGame({
          variant,
          renderer: new Renderer(setUpdateCounter),
        })
      : undefined;
    setG(newGame);
  }, [gameId]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log("rendering", g, gameId);
  return <GameContext.Provider value={{ game: g }}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
