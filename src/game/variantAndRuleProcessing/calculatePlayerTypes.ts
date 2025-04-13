import { PlayerType } from "game/types";

export function calculatePlayerTypes(
  numberOfPlayers: number,
  playerTypes?: PlayerType[]
): PlayerType[] {
  playerTypes ??= ["local_human", "local_ai"];

  if (playerTypes.length >= numberOfPlayers) return playerTypes.slice(0, numberOfPlayers);

  const newDefaultPlayerTypes = new Array(numberOfPlayers - playerTypes.length).fill(
    "local_ai"
  );

  return playerTypes.concat(newDefaultPlayerTypes);
}
