import { Region } from "../types";
import { Rule } from "./CompactRules";

export const emptyCenter: Rule = {
  title: "Empty Center",
  description: "No pieces allowed in the center!",
  afterBoardCreation: ({ board }) => {
    //note: interruption point may change depending on rolling variants.
    const centerSquares = board.getRegion(Region.center);
    centerSquares.map((square) => {
      board.killPiecesAt(square.location);
      square.whiteListedMarkers = [];
    });
    return { board };
  },
};
