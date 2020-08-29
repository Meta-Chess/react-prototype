import React, { createContext, FC, useState } from "react";
import { Game } from "./Game";
import { Renderer } from "./Renderer";
import { variants, VariantName } from "game/variants";

const game = Game.createEmptyGame();

const GameContext = createContext({
  game,
});

interface Props {
  variant: VariantName;
}

const GameProvider: FC<Props> = ({ children, variant }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_updateCounter, setUpdateCounter] = useState(0);
  game.giveRenderer(new Renderer(setUpdateCounter));
  game.setVariant(variant);
  const [g] = useState(game);

  return <GameContext.Provider value={{ game: g }}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
