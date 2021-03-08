import { Rule } from "./CompactRules";
import { GameMaster } from "game";
import { Player } from "game/Player/Player";

const MAX_ROLLING_VARIANTS = 2; // TODO: Make this a rule parameter - note this is used in `findConflicts`
const NUMBER_OF_TURNS = 4;
const VARIANTS_ROLLING_IN = 1;
const VARIANTS_ROLLING_OUT = 1;
const STARTING_ROLLING_VARIANTS = 0;

// TODO: fatigue rolling remove tokens(?), rebuild event center when rolling

export const rollingVariants: Rule = {
  title: "Rolling Variants",
  description:
    "At the end of the turn on which the rolling counter hits zero, the variant that's been in play longest deactivates, and a new variant is randomly chosen from the deck",

  formatControlAtTurnStart: ({ gameMaster }) => {
    const playerWithRollCounter = findRollCounter(gameMaster);
    const playerIndex = gameMaster.game.getIndexOfPlayer(playerWithRollCounter);
    const counterValue = playerWithRollCounter?.getRuleData("rollingVariantsCounter");

    if (
      playerWithRollCounter === undefined ||
      counterValue === undefined ||
      playerIndex === undefined
    ) {
      rollVariants({
        gameMaster,
        rollingInNumber: STARTING_ROLLING_VARIANTS,
        rollingOffNumber: 0,
      });
      moveCounterToPreviousOrLastPlayer(gameMaster, NUMBER_OF_TURNS);
    } else if (counterValue === 1 && gameMaster.game.currentPlayerIndex === playerIndex) {
      const atVariantLimit = gameMaster.formatVariants.length >= MAX_ROLLING_VARIANTS;
      rollVariants({
        gameMaster,
        rollingInNumber: VARIANTS_ROLLING_IN,
        rollingOffNumber: atVariantLimit ? VARIANTS_ROLLING_OUT : 0,
      });
      moveCounterToPreviousOrLastPlayer(gameMaster, NUMBER_OF_TURNS);
    } else if (gameMaster.game.currentPlayerIndex === playerIndex) {
      playerWithRollCounter.setRuleData({
        key: "rollingVariantsCounter",
        value: counterValue - 1,
      });
    }

    return { gameMaster };
  },
};

function findRollCounter(gameMaster: GameMaster): Player | undefined {
  return gameMaster.game
    .getPlayers()
    .find((player) => !!player.getRuleData("rollingVariantsCounter"));
}

function rollVariants({
  gameMaster,
  rollingInNumber,
  rollingOffNumber,
}: {
  gameMaster: GameMaster;
  rollingInNumber: number;
  rollingOffNumber: number;
}): void {
  if (gameMaster.deck?.length) {
    const newVariants = gameMaster.deck.slice(0, rollingInNumber);
    const variantsRollingOff = gameMaster.formatVariants.slice(0, rollingOffNumber);
    gameMaster.setActiveVariants([
      ...gameMaster.formatVariants.slice(rollingOffNumber),
      ...newVariants,
    ]);
    gameMaster.deck = [...gameMaster.deck?.slice(rollingInNumber), ...variantsRollingOff];
  }
}

function moveCounterToPreviousOrLastPlayer(
  gameMaster: GameMaster,
  counterValue: number
): void {
  const playerWithRollCounter = findRollCounter(gameMaster);
  const playerIndex = gameMaster.game.getIndexOfPlayer(playerWithRollCounter);
  playerWithRollCounter?.setRuleData({
    key: "rollingVariantsCounter",
    value: undefined,
  });
  gameMaster.game.getPreviousAlivePlayer(playerIndex || 0)?.setRuleData({
    key: "rollingVariantsCounter",
    value: counterValue,
  });
}
