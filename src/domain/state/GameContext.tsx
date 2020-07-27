import React, { FC, useState, createContext } from "react";
import { GameState } from "./GameState";
import { Renderer } from "./Renderer";

const GameContext = createContext({
  gameState: GameState.createEmptyGameState(
    new Renderer((val: number): void => {
      throw new Error(`This code should never be reached (val = ${val})`);
    })
  ),
});

const GameStateProvider: FC = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateCounter, setUpdateCounter] = useState(0);
  const [gameState] = useState(
    GameState.createStandardGameState(new Renderer(setUpdateCounter))
  );

  return (
    <GameContext.Provider value={{ gameState }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameStateProvider, GameContext };
