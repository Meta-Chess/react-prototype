import { Rule } from "./CompactRules";

const NUMBER_OF_VARIANTS = 3; // TODO: Make this a rule parameter

export const rollingVariants: Rule = {
  title: "Rolling Variants",
  description:
    "At the end of the turn on which the rolling counter hits zero, the variant that's been in play longest deactivates, and a new variant is randomly chosen from the deck",

  formatControlAtTurnStart: ({ gameMaster }) => {
    if (!gameMaster.deck || gameMaster.deck.length < NUMBER_OF_VARIANTS)
      throw new Error("Insufficient cards in deck!"); // TODO: should this be an error here? Can we prevent this somehow?

    if (gameMaster.formatVariants.length < NUMBER_OF_VARIANTS) {
      const numberOfVariantsToAdd = NUMBER_OF_VARIANTS - gameMaster.formatVariants.length;
      gameMaster.setActiveVariants([
        ...gameMaster.formatVariants,
        ...(gameMaster.deck?.slice(0, numberOfVariantsToAdd) || []),
      ]);
      gameMaster.deck = gameMaster.deck?.slice(numberOfVariantsToAdd);
    } else {
      const newVariant = gameMaster.deck?.[0];
      const variantRollingOff = gameMaster.formatVariants[0];
      gameMaster.setActiveVariants([...gameMaster.formatVariants.slice(1), newVariant]);
      gameMaster.deck = [...gameMaster.deck?.slice(1), variantRollingOff];
    }
    return { gameMaster };
  },
};
