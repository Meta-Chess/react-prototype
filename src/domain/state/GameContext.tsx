import React, { FC, useState, createContext } from "react";
import { GameState } from "./GameState";

const GameContext = createContext({
  gameState: GameState.createEmptyGameState(),
  setGameState: (newGameState: GameState) => {},
});

const GameStateProvider: FC = ({ children }) => {
  const [thing, updateThing] = useState(false);
  const forceUpdate = () => {
    updateThing(!thing);
  };

  const [gameState, setGameState] = useState(GameState.createBasicGameState());

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameStateProvider, GameContext };
