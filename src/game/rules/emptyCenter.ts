import { Rule } from "./CompactRules";

export const emptyCenter: Rule = {
  title: "Empty Center",
  description: "No pieces allowed in the center!",
  afterBoardCreation: ({ board }) => {
    //note: interruption point may change depending on rolling variants.
    const centerSquares = board.getRegion("center");
    centerSquares.map((square) => {
      board.killPiecesAt({ piecesLocation: square.location });
      square.whiteListedMarkers = [];
    });
    return { board };
  },
};
