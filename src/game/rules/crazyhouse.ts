import { PieceName, Gait, Region } from "../types";
import { Path } from "game/Pather";
import { Square } from "../Board";
import { Rule } from "./CompactRules";
import { LocationPrefix } from "game/Board/location";
import { invisibilityToken } from "./constants";
import { rotate180 } from "./utilities";

export const crazyhouse: Rule = {
  title: "Crazyhouse",
  description: "Replay captured pieces",
  //Generate a piece bank square for each player.
  afterGameCreation: ({ game }) => {
    game.board.addSquares(
      game.players.map((player) => {
        const location = LocationPrefix.pieceBank + player.name.toString();
        return {
          location: location,
          square: new Square(
            location,
            { rank: 100 + player.name, file: 100 + player.name },
            [],
            [invisibilityToken]
          ),
        };
      })
    );
    return { game };
  },
  //Captured pieces are morphed and added to piece bank.
  onSendPieceToGrave: ({ piece, mover, captured, destination }) => {
    if (!captured || mover === undefined) return { piece, mover, captured, destination };
    destination = LocationPrefix.pieceBank + mover.toString();

    if (piece.owner !== mover && piece.name === PieceName.Pawn) {
      //TODO: refactor piece types to be a tag system, this will handle toroidal pawns.
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
  //TODO: generalize promotion zones
  generateSpecialPacifistMoves: ({ game, piece, interrupt, moves }) => {
    const pieceLocation = piece.location;
    if (piece === undefined || pieceLocation.slice(0, 3) !== LocationPrefix.pieceBank)
      return { game, piece, interrupt, moves };
    const newMoves = game.board
      .getSquares()
      .filter((square) => {
        if (square === undefined) return false;
        if (square.location.charAt(0) === LocationPrefix.graveyard) return false;
        if (
          piece.name === PieceName.Pawn &&
          game.board.getRegion(Region.promotion).includes(square)
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
};
