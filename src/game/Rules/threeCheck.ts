import { CompactRules, Rule } from "./CompactRules";
import { Pather } from "../Pather";
import { cloneDeep } from "lodash";
import { Game, Move } from "game";
import { TokenName, PlayerCounter, PlayerName } from "game/types";
import { Player } from "game/Player";

export const threeCheck: Rule = {
  title: "Three Check",
  description: "If you are placed in check 3 times - you lose.",
  afterGameCreation: ({ game }) => {
    const CheckCounter = {
      name: TokenName.CheckCounter,
      expired: (): boolean => {
        return false;
      },
      data: {
        playerCounter: initializePlayerCounter(game),
      },
    };
    game.board.addToken(CheckCounter);
    return { game };
  },
  postCapture: ({ board, square }) => {
    const playerCounter = board.firstTokenWithName(TokenName.CheckCounter)?.data
      ?.playerCounter;
    if (playerCounter === undefined) return { board, square };
    if (playerCounter[PlayerName.Black] === undefined) return { board, square };
    playerCounter[PlayerName.Black]! += 1;
    return { board, square };
  },
  lossCondition: ({ playerName, game, gameClones, interrupt, dead }) => {
    playerName = game.getCurrentPlayerName();
    const checkCounterToken = game.board.firstTokenWithName(TokenName.CheckCounter);
    const playerCounter = checkCounterToken?.data?.playerCounter;
    if (playerCounter !== undefined) {
      const currentPlayerCheckCount = playerCounter[playerName];
      if (currentPlayerCheckCount !== undefined && currentPlayerCheckCount >= 3)
        return { playerName, game, gameClones, interrupt, dead: "checked thrice" };
    }

    return { playerName, game, gameClones, interrupt, dead: false };
  },
};

function initializePlayerCounter(game: Game): PlayerCounter {
  return Object.assign(
    {},
    ...game
      .alivePlayers()
      .map((player) => player.name)
      .map((k) => ({ [k]: 0 }))
  );
}
