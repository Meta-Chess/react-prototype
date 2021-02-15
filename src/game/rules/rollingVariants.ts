import { Rule } from "./CompactRules";
import { GameMaster } from "game";
import { Player } from "game/Player/Player";

const NUMBER_OF_VARIANTS = 3; // TODO: Make this a rule parameter - note this is used in `findConflicts`
const NUMBER_OF_TURNS = 3;

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
      rollVariants(gameMaster, NUMBER_OF_VARIANTS, 0);
      moveCounterToPreviousOrLastPlayer(gameMaster, NUMBER_OF_TURNS);
    } else if (counterValue === 1 && gameMaster.game.currentPlayerIndex === playerIndex) {
      rollVariants(gameMaster, NUMBER_OF_VARIANTS, 1);
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

function rollVariants(
  gameMaster: GameMaster,
  simultaneousVariantsNumber: number,
  rollingOffNumber: number
): void {
  if (gameMaster.deck?.length) {
    const numberOfVariantsToAdd =
      simultaneousVariantsNumber - gameMaster.formatVariants.length + rollingOffNumber;
    const newVariants = gameMaster.deck.slice(0, numberOfVariantsToAdd);
    const variantsRollingOff = gameMaster.formatVariants.slice(0, rollingOffNumber);
    gameMaster.setActiveVariants([
      ...gameMaster.formatVariants.slice(rollingOffNumber),
      ...newVariants,
    ]);
    gameMaster.deck = [
      ...gameMaster.deck?.slice(numberOfVariantsToAdd),
      ...variantsRollingOff,
    ];
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
