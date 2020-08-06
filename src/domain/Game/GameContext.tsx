import React, { FC, useState, createContext } from "react";
import { Game } from "./Game";
import { Renderer } from "./Renderer";

const GameContext = createContext({
  game: Game.createEmptyGame(
    new Renderer((val: number): void => {
      throw new Error(`This code should never be reached (val = ${val})`);
    })
  ),
});

const GameProvider: FC = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateCounter, setUpdateCounter] = useState(0);
  const [game] = useState(
    Game.createStandardGame(new Renderer(setUpdateCounter))
  );

  return (
    <GameContext.Provider value={{ game }}>{children}</GameContext.Provider>
  );
};

export { GameProvider, GameContext };
