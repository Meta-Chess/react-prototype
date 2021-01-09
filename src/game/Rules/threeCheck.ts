import { Rule } from "./CompactRules";
import { TokenName } from "game/types";
import { inCheck } from "./check";

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
        counters: game.players.map(() => 0),
      },
    };
    game.board.addToken(CheckCounter);
    return { game };
  },
  lossCondition: ({ playerName, game, gameClones, interrupt, dead }) => {
    if (dead || game.getCurrentPlayerName() !== playerName) {
      return { playerName, game, gameClones, interrupt, dead };
    }

    const checkCounters = game.board.firstTokenWithName(TokenName.CheckCounter)?.data
      ?.counters;
    if (checkCounters === undefined)
      return { playerName, game, gameClones, interrupt, dead };
    const playerIndex = game.players.findIndex((player) => player.name === playerName);
    if (inCheck(game, gameClones, interrupt)) {
      checkCounters[playerIndex] += 1;
    }

    if (checkCounters[playerIndex] >= 3)
      return { playerName, game, gameClones, interrupt, dead: "checked thrice" };

    return { playerName, game, gameClones, interrupt, dead: false };
  },
};
