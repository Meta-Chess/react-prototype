import { Rule, ParameterRule, ProcessMoves } from "./CompactRules";
import { CaptureData, Move } from "game/Move";
import { uniq } from "lodash";
import { Pather } from "game/Pather";
import { Game } from "game/Game";
import { isPresent } from "utilities";
import { getDefaultParams } from "./utilities";
import { CompactRules } from ".";
import { RULE_SETTINGS } from "./chainReactionSettings";

export const chainReaction: ParameterRule = (
  ruleParams = getDefaultParams(RULE_SETTINGS)
): Rule => {
  return {
    title: "Chain Reaction",
    description: `When a piece is captured it captures every piece it was threatening. Max chain length ${ruleParams["Max Chain Length"]}.`,
    processMoves: ({ moves, game, gameClones, params }): ProcessMoves => {
      const processedMoves =
        params.chainReactionSearch !== false
          ? moves.map((m) =>
              addChainOfCapturesToMove(
                m,
                game,
                gameClones,
                game.interrupt,
                ruleParams["Max Chain Length"]
              )
            )
          : moves;
      return { moves: processedMoves, game, gameClones, params };
    },
  };
};

function addChainOfCapturesToMove(
  move: Move,
  game: Game,
  gameClones: Game[],
  interrupt: CompactRules,
  maxChainLength: number
): Move {
  const captures = move.captures;
  if (!captures) return move;
  move.captures = undefined;

  const newGame = gameClones[0];
  const newClones = gameClones.slice(1);
  newGame.resetTo(game);
  newGame.doMove(move);

  let layerData: layerData = {
    game: newGame,
    gameClones: newClones,
    captures,
    interrupt,
  };

  for (let i = 0; i < maxChainLength; i++) {
    layerData = findNextLayerOfCaptures(layerData);
    captures.push(...layerData.captures);
  }

  move.captures = captures;

  return move;
}

function findNextLayerOfCaptures(input: layerData): layerData {
  const capturedPieces = uniq(input.captures.flatMap((capture) => capture.pieceIds))
    .map((pieceId) => input.game.board.getPiece(pieceId))
    .filter(isPresent);

  const captures = capturedPieces.flatMap((piece) => {
    const pather = new Pather(input.game, input.gameClones, piece, input.interrupt, {
      checkDepth: 0,
      noForkSearch: false,
      chainReactionSearch: false,
    });
    return pather.findPaths().flatMap((m) => m.captures || []);
  });

  input.captures.forEach((capture) =>
    input.game.board.displacePieces({
      location: capture.at,
      playerName: capture.capturer,
      pieceDeltas: [],
      captures: [capture],
    })
  );

  input.captures = captures;
  return input;
}

interface layerData {
  game: Game;
  gameClones: Game[];
  captures: CaptureData[];
  interrupt: CompactRules;
}
