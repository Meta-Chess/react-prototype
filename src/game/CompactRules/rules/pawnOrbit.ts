import { PieceName } from "game/types";
import { Path } from "game/Pather";
import { GenerateSpecialPacifistMoves, TrivialParameterRule } from "../CompactRules";

export const pawnOrbit: TrivialParameterRule = () => ({
  title: "Pawn Orbit",
  description: "Pawns can rotate pieces around themselves clockwise or anticlockwise",
  generateSpecialPacifistMoves: ({
    game,
    piece,
    interrupt,
    moves,
    gaits,
    ...rest
  }): GenerateSpecialPacifistMoves => {
    const pieceLocation = piece.location;
    if (game.board.isLocationGraveyard(pieceLocation)) {
      return { game, piece, interrupt, moves, gaits, ...rest };
    }
    if (piece.name !== PieceName.Pawn)
      return { game, piece, interrupt, moves, gaits, ...rest };

    const currentSquare = game.board.squareAt(pieceLocation);
    if (currentSquare === undefined)
      return { game, piece, interrupt, moves, gaits, ...rest };

    const orderedLocations = [
      currentSquare.adjacencies.getClockwiseOrderedLocations(
        game.board.getClockwiseDirections()
      ),
      currentSquare.adjacencies.getAntiClockwiseOrderedLocations(
        game.board.getClockwiseDirections()
      ),
    ];
    const rotateDeltas = orderedLocations.map((locationsInDirection) =>
      locationsInDirection.flatMap((location, i, locations) =>
        game.board.getPiecesAt(location).map((piece) => {
          return {
            pieceId: piece.id,
            path: new Path(location, [location, locations[(i + 1) % locations.length]]),
          };
        })
      )
    );

    const newMoves = rotateDeltas.map((deltas) => {
      return {
        pieceId: piece.id,
        location: pieceLocation,
        pieceDeltas: deltas,
        playerName: piece.owner,
      };
    });
    return { game, piece, interrupt, moves: [...moves, ...newMoves], gaits, ...rest };
  },
});
