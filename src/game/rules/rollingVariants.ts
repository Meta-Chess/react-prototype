import { Rule } from "./CompactRules";
import { GameMaster } from "game";
import { Player } from "game/Player/Player";

const NUMBER_OF_VARIANTS = 3; // TODO: Make this a rule parameter
const NUMBER_OF_TURNS = 3;

// TODO: fatigue rolling remove tokens(?), rebuild event center when rolling

export const rollingVariants: Rule = {
  title: "Rolling Variants",
  description:
    "At the end of the turn on which the rolling counter hits zero, the variant that's been in play longest deactivates, and a new variant is randomly chosen from the deck",

  formatControlAtTurnStart: ({ gameMaster }) => {
    if (!gameMaster.deck || gameMaster.deck.length < NUMBER_OF_VARIANTS)
      throw new Error("Insufficient cards in deck!"); // TODO: should this be an error here? Can we prevent this somehow?

    // Setup if there aren't format variants yet
    if (gameMaster.formatVariants.length < NUMBER_OF_VARIANTS) {
      const numberOfVariantsToAdd = NUMBER_OF_VARIANTS - gameMaster.formatVariants.length;
      gameMaster.setActiveVariants([
        ...gameMaster.formatVariants,
        ...(gameMaster.deck?.slice(0, numberOfVariantsToAdd) || []),
      ]);
      gameMaster.deck = gameMaster.deck?.slice(numberOfVariantsToAdd);
    }

    const playerWithRollCounter = findRollCounter(gameMaster);
    const playerIndex = gameMaster.game.getIndexOfPlayer(playerWithRollCounter);
    const counterValue = playerWithRollCounter?.getRuleData("rollingVariantsCounter");

    if (
      playerWithRollCounter === undefined ||
      counterValue === undefined ||
      playerIndex === undefined
    ) {
      gameMaster.game.getPreviousAlivePlayer(0)?.setRuleData({
        key: "rollingVariantsCounter",
        value: NUMBER_OF_TURNS,
      });
    } else if (counterValue === 1 && gameMaster.game.currentPlayerIndex === playerIndex) {
      playerWithRollCounter?.setRuleData({
        key: "rollingVariantsCounter",
        value: undefined,
      });

      const newVariant = gameMaster.deck?.[0];
      const variantRollingOff = gameMaster.formatVariants[0];
      gameMaster.setActiveVariants([...gameMaster.formatVariants.slice(1), newVariant]);
      gameMaster.deck = [...gameMaster.deck?.slice(1), variantRollingOff];

      gameMaster.game.getPreviousAlivePlayer(playerIndex)?.setRuleData({
        key: "rollingVariantsCounter",
        value: NUMBER_OF_TURNS,
      });
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
