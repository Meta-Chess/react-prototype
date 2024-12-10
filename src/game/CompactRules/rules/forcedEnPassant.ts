import { InPostMoveGenerationFilter, PreprocessingAtTurnStart } from "../CompactRules";
import { Move } from "game";
import { TokenName } from "game/types";
import { TrivialParameterRule } from "../CompactRules";
import { Board } from "game/Board";
import { Pather } from "game/Pather";

export const forcedEnPassant: TrivialParameterRule = () => ({
  title: "Forced En Passant",
  description: "En passant must be performed if possible.",
  preprocessingAtTurnStart: ({
    game,
    gameClones,
    player,
    ...rest
  }): PreprocessingAtTurnStart => {
    const pieces = game.board.piecesBelongingTo(player.name);
    const isInterceptionPossible = pieces.some((piece) => {
      const pather = new Pather(game, gameClones, piece, game.interrupt, {
        checkDepth: 0,
      });
      const moves = pather.findPaths();
      return moves.some((move) => isMoveInterception(move, game.board));
    });

    if (isInterceptionPossible) {
      const currentTurn = game.getCurrentTurn();
      const interceptionPossibleToken = {
        name: TokenName.InterceptionPossible,
        expired: (turn: number): boolean => {
          return turn >= currentTurn;
        },
        data: {},
      };
      game.board.addToken(interceptionPossibleToken);
    }

    return { game, gameClones, player, ...rest };
  },

  inPostMoveGenerationFilter: (input): InPostMoveGenerationFilter => {
    if (input.filtered) return input;
    const isInterceptionPossible = input.game.board.hasTokenWithName(
      TokenName.InterceptionPossible
    );

    return {
      ...input,
      filtered:
        isInterceptionPossible && !isMoveInterception(input.move, input.game.board),
    };
  },
});

function isMoveInterception(move: Move, board: Board): boolean {
  const captures = move.captures || [];
  if (captures.length === 0) return false;

  const pilotPiece = board.getPiece(move.pieceId);
  if (!pilotPiece) return false;

  const capturedPieceIds = captures.flatMap((capture) => capture.pieceIds);

  const anyCaptureIsInterception = captures.some((capture) => {
    const captureSquare = board.squareAt(capture.at);
    const captureTokens =
      captureSquare?.tokensSatisfyingRule(
        (token) => token.name === TokenName.CaptureToken
      ) || [];
    const captureIsInterception = captureTokens.some((token) => {
      const tokenCondition = token.data?.condition;
      const tokenPieceId = token.data?.pieceId;
      return (
        tokenCondition &&
        tokenCondition(pilotPiece) &&
        tokenPieceId &&
        capturedPieceIds.includes(tokenPieceId)
      );
    });

    return captureIsInterception;
  });

  return anyCaptureIsInterception;
}
