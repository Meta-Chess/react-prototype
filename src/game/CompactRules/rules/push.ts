import type { Rule, ParameterRule, GenerateSpecialPacifistMoves } from "../CompactRules";
import { Piece } from "game";
import { Gait } from "game/types/types";
import { Move } from "game/Move";
import { Pather, Path } from "game/Pather";

export const push: ParameterRule = (): Rule => {
  return {
    title: "Push",
    description: "Adjacent friendly pieces can be pushed.",

    generateSpecialPacifistMoves: ({
      game,
      piece,
      gaits,
      moves,
      interrupt,
      ...rest
    }): GenerateSpecialPacifistMoves => {
      const gameClone = game.clone();
      const square = gameClone.board.squareAt(piece.location);
      gameClone.board.killPiece(piece.id);

      const newMoves = gaits
        .filter((gait) => !gait.nonBlocking && !gait.phaser)
        .flatMap((gait): Move[] => {
          const nextPiece: Piece | undefined = gameClone.board.getPiecesAt(
            square?.go(gait.pattern[0])[0]
          )[0];
          if (nextPiece) {
            return nextPiece.owner === piece.owner
              ? push()
                  .generateSpecialPacifistMoves?.({
                    game: gameClone,
                    piece: nextPiece,
                    gaits: [
                      {
                        ...gait,
                        mustNotCapture: true,
                        data: {
                          ...gait.data,
                          pathOffset: (gait.data?.pathOffset || 0) + 1,
                        }, //TODO: use this.
                      },
                    ],
                    moves: [],
                    interrupt,
                    ...rest,
                  })
                  ?.moves?.map((move): Move => {
                    const path = move.pieceDeltas[0].path.getPath();
                    const newPath = new Path(piece.location, path.slice(0, -1));
                    return {
                      pieceId: piece.id,
                      location: newPath.getEnd(),
                      playerName: piece.owner,
                      data: gait.data,
                      pieceDeltas: [
                        { pieceId: piece.id, path: newPath },
                        ...move.pieceDeltas,
                      ],
                    };
                  }) || []
              : [];
          } else if (gait.data?.pathOffset) {
            const pieceClone = piece.clone();
            pieceClone.generateGaits = (): Gait[] => [
              {
                ...gait,
                mustNotCapture: true,
                data: { ...gait.data, pathOffset: undefined }, //TODO: use this.
              },
            ];

            return new Pather(game, [], pieceClone, interrupt, {
              dontFilter: true,
              dontProcess: true,
            }).findPaths();
          } else return [];
        });

      return { game, piece, gaits, moves: [...moves, ...newMoves], interrupt, ...rest };
    },
  };
};
