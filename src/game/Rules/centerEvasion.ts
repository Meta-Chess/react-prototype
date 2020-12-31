import { Rule } from "./Rules";
import { Region, TokenName } from "../types";

export const centerEvasion: Rule = {
  name: "Center Evasion",
  description: "Cannot select any center squares for movement.",
  afterBoardCreation: ({ board }) => {
    const evadeToken = {
      name: TokenName.EvadeToken,
      expired: (): boolean => {
        return false;
      },
      data: undefined,
    };

    const centerSquares = board.getRegion(Region.center);
    centerSquares.forEach((s) => {
      s?.addToken(evadeToken);
    });
    return { board };
  },

  inCanStayFilter: ({ move, game, gameClones, interrupt, patherParams, filtered }) => {
    const landingSquare = game.board.squareAt(move.location);
    if (landingSquare?.hasTokenWithName(TokenName.EvadeToken)) {
      filtered = true;
    }
    return { move, game, gameClones, interrupt, patherParams, filtered };
  },
};
