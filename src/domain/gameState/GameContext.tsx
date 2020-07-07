import React, { FC, useState, createContext } from "react";
import { defaultState } from "./defaultState";
import { State } from "domain/types";

const GameContext = createContext({
  gameState: defaultState,
  setGameState: (newGameState: State) => {},
});

const GameStateProvider: FC = ({ children }) => {
  const [gameState, setGameState] = useState(defaultState);

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameStateProvider, GameContext };
