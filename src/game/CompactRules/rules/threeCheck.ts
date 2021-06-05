import { Rule, ParameterRule, LossCondition, SubscribeToEvents } from "../CompactRules";
import { TokenName } from "game/types";
import { Game } from "game";
import { getDefaultParams } from "../utilities";

export const threeCheck: ParameterRule = (
  ruleParams = getDefaultParams("threeCheckSettings")
): Rule => {
  return {
    title: "Three Check",
    description: `If you are placed in check  times ${ruleParams["Number of Checks"]} you lose.`,

    lossCondition: ({ playerName, game, gameClones, interrupt, dead }): LossCondition => {
      if (dead || game.getCurrentPlayerName() !== playerName) {
        return { playerName, game, gameClones, interrupt, dead };
      }

      const checkCounters = game.board.firstTokenWithName(TokenName.CheckCounter)?.data
        ?.counters;
      if (checkCounters === undefined)
        return { playerName, game, gameClones, interrupt, dead };
      const playerIndex = game.players.findIndex((player) => player.name === playerName);

      if (checkCounters[playerIndex] >= (ruleParams["Number of Checks"] || 1))
        return {
          playerName,
          game,
          gameClones,
          interrupt,
          dead: `has been checked ${ruleParams["Number of Checks"]} times`,
        };

      return { playerName, game, gameClones, interrupt, dead: false };
    },

    subscribeToEvents: ({ events }): SubscribeToEvents => {
      events.subscribe({
        name: "check",
        consequence: ({ game, playerName }) => {
          if (!game.board.hasTokenWithName(TokenName.CheckCounter))
            addCheckTokenToBoard(game);
          const checkCounters = game.board.firstTokenWithName(TokenName.CheckCounter)
            ?.data?.counters;
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
};

function addCheckTokenToBoard(game: Game): void {
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
}
