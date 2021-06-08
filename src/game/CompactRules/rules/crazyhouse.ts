import { PieceName, Gait } from "game/types";
import { Path } from "game/Pather";
import {
  ParameterRule,
  OnSendPieceToGrave,
  GenerateSpecialPacifistMoves,
} from "../CompactRules";
import { LocationPrefix } from "game/Board/location";
import { rotate180 } from "../utilities";

export const crazyhouse: ParameterRule = () => ({
  title: "Crazyhouse",
  description: "Replay captured pieces",

  //Captured pieces are morphed and added to piece bank.
  onSendPieceToGrave: ({ piece, mover, captured, destination }): OnSendPieceToGrave => {
    if (!captured || mover === undefined) return { piece, mover, captured, destination };
    destination = LocationPrefix.pieceBank + mover.toString();

    if (piece.owner !== mover && piece.name === PieceName.Pawn) {
      // TODO: refactor piece types to be a tag system, this will handle toroidal pawns.
      //this needs to be generalized for multiple players/piece types
      const gaits = piece.generateGaits();
      const rotatedGaits = (): Gait[] =>
        gaits.map((gait) => ({
          ...gait,
          pattern: rotate180(gait.pattern),
        }));
      piece.generateGaits = rotatedGaits;
    }
    piece.owner = mover;
    piece.tokens = [];
    return { piece, mover, captured, destination };
  },
  //Pieces in friendly piece bank can move to any non-occupied square, pawns cannot move to promotion zone.
  // TODO: generalize promotion zones
  generateSpecialPacifistMoves: ({
    game,
    piece,
    interrupt,
    moves,
  }): GenerateSpecialPacifistMoves => {
    const pieceLocation = piece.location;
    if (piece === undefined || pieceLocation.slice(0, 3) !== LocationPrefix.pieceBank)
      return { game, piece, interrupt, moves };
    const newMoves = game.board
      .getSquares()
      .filter((square) => {
        if (square === undefined) return false;
        if (
          piece.name === PieceName.Pawn &&
          game.board.getRegion("promotion", piece.owner).includes(square)
        )
          return false;
        if (square.pieces.length > 0) return false;
        return true;
      })
      .map((placementSquare) => ({
        pieceId: piece.id,
        location: placementSquare.location,
        pieceDeltas: [
          {
            pieceId: piece.id,
            path: new Path(pieceLocation, [placementSquare.location]),
          },
        ],
        playerName: parseInt(pieceLocation.charAt(pieceLocation.length - 1)),
      }));
    return { game, piece, interrupt, moves: [...moves, ...newMoves] };
  },
});
