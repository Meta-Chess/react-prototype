import { Rule } from "./CompactRules";
import { TokenName } from "game/types";

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

    if (checkCounters[playerIndex] >= 3)
      return {
        playerName,
        game,
        gameClones,
        interrupt,
        dead: "has been checked 3 times",
      };

    return { playerName, game, gameClones, interrupt, dead: false };
  },

  subscribeToEvents: ({ events }) => {
    events.subscribe({
      name: "check",
      consequence: ({ game, playerName }) => {
        const checkCounters = game.board.firstTokenWithName(TokenName.CheckCounter)?.data
          ?.counters;
        if (!checkCounters) return { events };
        const playerIndex = game.players.findIndex(
          (player) => player.name === playerName
        );
        checkCounters[playerIndex] += 1;
      },
    });
    return { events };
  },
};
