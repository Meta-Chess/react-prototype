import { GenerateSpecialPacifistMoves, TrivialParameterRule } from "../CompactRules";
import type { Game, Square, Piece, Gait, Move, CompactRules, Board } from "game";
import { Pather, Path } from "game/Pather";
import { OrderedHashMap } from "utilities/OrderedHashMap";

export const push: TrivialParameterRule = () => ({
  title: "Push",
  description: "Adjacent friendly pieces can be pushed.",

  generateSpecialPacifistMoves: ({
    game,
    piece,
    interrupt,
    moves,
    gaits,
  }): GenerateSpecialPacifistMoves => {
    const maxFriendlyPieceChainLength = game.board.piecesBelongingTo(piece.owner).length;
    const pushMoves = gaits.flatMap((gait) => {
      const pushablePieceChain = findPushablePieceChain({
        pusher: piece,
        gait,
        board: game.board,
        maxSearchDepth: maxFriendlyPieceChainLength,
      });
      if (pushablePieceChain.length === 0) return [];

      const leadingPiece = pushablePieceChain[pushablePieceChain.length - 1];
      const leadingMoves = generateLeadingPushMoves({
        leadingPiece,
        gait,
        interrupt,
        game,
      });
      const followingPieces = pushablePieceChain.slice(0, -1);

      return amendLeadingPushMoves({
        leadingMoves,
        pusher: piece,
        followers: followingPieces,
      });
    });

    return { game, piece, interrupt, moves: [...moves, ...pushMoves], gaits };
  },
});

function findPushablePieceChain({
  pusher,
  gait,
  board,
  maxSearchDepth,
}: {
  pusher: Piece;
  gait: Gait;
  board: Board;
  maxSearchDepth: number;
}): Piece[] {
  const gaitCanPush = !gait.nonBlocking && !gait.phaser && !gait.mustCapture;
  if (!gaitCanPush) return [];

  function nextPieceWillBlockChain(
    nextPiece: Piece,
    preceedingChainPieces: Map<string, Piece>
  ): boolean {
    const isHostile = nextPiece.owner !== pusher.owner;
    const isPusher = nextPiece.id === pusher.id;
    const isAlreadyInChain = preceedingChainPieces.has(nextPiece.id);
    return isHostile || isPusher || isAlreadyInChain;
  }

  const chainPieces = new OrderedHashMap<string, Piece>();

  let nextSquare: Square | undefined = board.squareAt(pusher.location);
  let nextLocation: string | undefined;
  let nextPiece: Piece | undefined;
  for (let step = 0; step < maxSearchDepth; step++) {
    // TODO (Extension): consider when we can .go to multiple different squares
    // TODO (Extension): won't work for non-regular gait patterns e.g. NNE, NENW, etc...
    nextLocation = nextSquare?.go(gait.pattern[0])[0];
    nextSquare = board.squareAt(nextLocation);
    if (nextSquare === undefined) return [];

    // TODO (Extension): multiple next pieces (chess plus)
    nextPiece = board.getPiecesAt(nextLocation)[0];
    if (nextPiece !== undefined && nextPieceWillBlockChain(nextPiece, chainPieces))
      return [];

    const pathIsClear = nextPiece === undefined;
    if (pathIsClear) {
      break;
    }

    chainPieces.set(nextPiece.id, nextPiece);
  }

  return chainPieces.getValues();
}

function generateLeadingPushMoves({
  leadingPiece,
  gait,
  interrupt,
  game,
}: {
  leadingPiece: Piece;
  gait: Gait;
  interrupt: CompactRules;
  game: Game;
}): Move[] {
  const leaderGaits = [
    {
      ...gait,
      mustNotCapture: true,
    },
  ];
  return new Pather(game, [], leadingPiece, interrupt).findBasePaths(leaderGaits);
}

function amendLeadingPushMoves({
  leadingMoves,
  pusher,
  followers,
}: {
  leadingMoves: Move[];
  pusher: Piece;
  followers: Piece[];
}): Move[] {
  return leadingMoves.map((move) => {
    // TODO (Extension): handling moves which initially have multiple pieceDeltas
    const leaderPath = move.pieceDeltas[0].path.getPath();
    const orderedPiecesFromLeader = [...followers.reverse(), pusher];

    const amendingDeltas = [];
    let succeedingPath = leaderPath;
    for (const piece of orderedPiecesFromLeader) {
      const followingPath = new Path(piece.location, succeedingPath.slice(0, -1));
      amendingDeltas.push({ pieceId: piece.id, path: followingPath });
      succeedingPath = followingPath.getPath();
    }

    const pusherPath = amendingDeltas[amendingDeltas.length - 1].path;
    return {
      ...move,
      pieceId: pusher.id,
      location: pusherPath.getEnd(),
      playerName: pusher.owner,
      pieceDeltas: [...amendingDeltas, ...move.pieceDeltas],
    };
  });
}
