import { Board } from "game/Board";
import { Game } from "game/Game";
import { Player } from "game/Player";
import { PieceName, PlayerName, TokenName } from "game/types";
import { uniq } from "lodash";
import { LethalCondition, ParameterRule } from "../CompactRules";

export const extinction: ParameterRule = () => ({
  title: "Extinction",
  description: "If a piece type goes extinct for a player, they lose the game.",

  lethalCondition: ({ game, player, dead }): LethalCondition => {
    if (dead) return { game, player, dead };

    updateExtinctionToken(game, player);
    const isDead = anySpeciesExtinct(
      player.firstTokenWithName(TokenName.Extinction)?.data?.extinctionData || [],
      game.board.piecesBelongingTo(player.name).map((p) => p.name)
    );

    return {
      game,
      player,
      dead: isDead,
    };
  },
});

function anySpeciesExtinct(
  species: PieceName[],
  pieceNames: PieceName[]
): false | string {
  const extinctSpecies = species.find((s) => !pieceNames.includes(s));
  return extinctSpecies === undefined ? false : "lost by extinction";
}

function findPieceTypesBelongingToPlayer(
  board: Board,
  playerName: PlayerName
): PieceName[] {
  return uniq(board.piecesBelongingTo(playerName).map((piece) => piece.name));
}

function updateExtinctionToken(game: Game, player: Player): void {
  const extinction = TokenName.Extinction;
  const oldExtinctionData = player.firstTokenWithName(extinction)?.data || {
    turnNumber: -1,
    extinctionData: [],
  };
  const tokenIsOld =
    oldExtinctionData.turnNumber === undefined ||
    game.currentTurn - oldExtinctionData.turnNumber > 1;

  player.removeTokensByName(extinction);
  player.addToken({
    name: extinction,
    expired: () => false,
    data: {
      turnNumber: game.currentTurn,
      extinctionData: tokenIsOld
        ? findPieceTypesBelongingToPlayer(game.board, player.name)
        : oldExtinctionData.extinctionData,
    },
  });
}
