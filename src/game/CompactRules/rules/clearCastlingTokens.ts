import { TokenName } from "game/types";
import { AfterBoardCreation } from "../CompactRules";
import { TrivialParameterRule } from "game";

export const clearCastlingTokens: TrivialParameterRule = () => ({
  title: "Clear Castling Tokens",
  description: "No castling!",
  afterBoardCreation: ({ board }): AfterBoardCreation => {
    board
      .getPieces()
      .map((piece) =>
        piece.removeTokensByNames([TokenName.PassiveCastling, TokenName.ActiveCastling])
      );
    return { board };
  },
});
