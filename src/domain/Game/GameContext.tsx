import React, { createContext, FC, useState } from "react";
import { Game } from "./Game";
import { Renderer } from "./Renderer";

import { Hex, HexPawnDoubleStep } from "./Rules";

const standardGame = Game.createGame([Hex, HexPawnDoubleStep]);
// const standardGame = Game.createGame([Standard, Polar, Cylindrical, PawnDoubleStep]);

const GameContext = createContext({
  game: Game.createEmptyGame(),
});

const GameProvider: FC = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_updateCounter, setUpdateCounter] = useState(0);
  standardGame.giveRenderer(new Renderer(setUpdateCounter));
  const [game] = useState(standardGame);

  return <GameContext.Provider value={{ game }}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
