import { Rule } from "./CompactRules";
import { CaptureData, Move } from "game/Move";
import { uniq } from "lodash";
import { Pather } from "game/Pather";
import { Game } from "game/Game";
import { isPresent } from "utilities";
import { CompactRules } from ".";

const MAX_CHAIN_LENGTH = 5;

export const chainReaction: Rule = {
  title: "Chain Reaction",
  description: `When a piece is captured it captures every piece it was threatening. Max chain length ${MAX_CHAIN_LENGTH}.`,

  //Note: a more rigorous implementation would probably interrupt during pathing not after to allow chains of pieces to not self interfere.
  processMoves: ({ moves, game, gameClones, params }) => {
    const processedMoves =
      params.chainReactionSearch !== false
        ? moves.map((m) => addChainOfCapturesToMove(m, game, gameClones, game.interrupt))
        : moves;

    return { moves: processedMoves, game, gameClones, params };
  },
};

function addChainOfCapturesToMove(
  move: Move,
  game: Game,
  gameClones: Game[],
  interrupt: CompactRules
): Move {
  let captures = move.captures;
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

  for (let i = 0; i < MAX_CHAIN_LENGTH; i++) {
    layerData = findNextLayerOfCaptures(layerData);
    captures = [...captures, ...layerData.captures];
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
    return pather
      .findPaths()
      .map((m) => m.captures)
      .filter(isPresent)
      .flat();
  });

  input.captures.forEach((capture) =>
    input.game.board.displacePieces({
      pieceId: "-1",
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
