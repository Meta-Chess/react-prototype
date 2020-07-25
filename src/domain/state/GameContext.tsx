import React, { FC, useState, createContext } from "react";
import { GameState } from "./GameState";
import { Renderer } from "./Renderer";

const GameContext = createContext({
  gameState: GameState.createEmptyGameState(new Renderer((val: number) => {})),
});

const GameStateProvider: FC = ({ children }) => {
  const [updateCounter, setUpdateCounter] = useState(0);

  const [gameState, setGameState] = useState(
    GameState.createStandardGameState(new Renderer(setUpdateCounter))
  );

  return (
    <GameContext.Provider value={{ gameState }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameStateProvider, GameContext };
