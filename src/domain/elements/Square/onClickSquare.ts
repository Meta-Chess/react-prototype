import { SetState, Square, State } from "domain/types";
import { phases } from "domain/variants";

export const onClickSquare = (
  gameState: State,
  setGameState: SetState,
  square: Square
) => () => {
  phases[gameState.phase].onClickSquare(gameState, setGameState, square);
};
