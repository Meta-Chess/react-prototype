import React, { FC, useState, createContext } from "react";
import { Game } from "./Game";
import { Renderer } from "./Renderer";
import { Hex, HexPawnDoubleStep, Cylindrical } from "./Variants";
// import { Standard, Polar, Cylindrical, PawnDoubleStep } from "./Variants";

const standardGame = Game.createGame([Hex, HexPawnDoubleStep, Cylindrical]);
// const standardGame = Game.createGame([Standard, Polar, Cylindrical, PawnDoubleStep]);

const GameContext = createContext({
  game: Game.createEmptyGame(),
});

const GameProvider: FC = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateCounter, setUpdateCounter] = useState(0);
  standardGame.giveRenderer(new Renderer(setUpdateCounter));
  const [game] = useState(standardGame);

  return <GameContext.Provider value={{ game }}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
