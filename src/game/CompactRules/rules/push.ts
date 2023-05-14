import { GenerateSpecialPacifistMoves, TrivialParameterRule } from "../CompactRules";

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
    return { game, piece, interrupt, moves, gaits };
  },
});
