import { Board } from "game/Board";
import { Game } from "game/Game";
import { Player } from "game/Player";
import { allPossiblePieceNames, PieceName, PlayerName, TokenName } from "game/types";
import { uniq } from "lodash";
import { LethalCondition, ParameterRule } from "../CompactRules";

export const extinction: ParameterRule<"extinction"> = ({ Species: _species }) => ({
  title: "Extinction",
  description: "If a piece type goes extinct for a player, they lose the game.",

  lethalCondition: ({ game, player, dead }): LethalCondition => {
    if (dead) return { game, player, dead };

    const species = getSpeciesFromParam(_species);

    updateExtinctionToken(game, player, species);

    const isDead = anySpeciesExtinct(
      game.board.piecesBelongingTo(player.name).map((p) => p.name),
      player.firstTokenWithName(TokenName.Extinction)?.data?.extinctionData
    );

    return {
      game,
      player,
      dead: isDead,
    };
  },
});

function getSpeciesFromParam(species: PieceName[][] = []): PieceName[][] {
  const flatSpecies = species.flatMap((x) => x);
  const singletons = allPossiblePieceNames
    .filter((x) => !flatSpecies.includes(x))
    .map((x) => [x]);
  return [...species, ...singletons];
}

function anySpeciesExtinct(
  pieceNames: PieceName[],
  species?: PieceName[][]
): false | string {
  const extinctSpecies = species?.find((s) => !s.find((p) => pieceNames.includes(p)));
  return extinctSpecies === undefined ? false : "lost by extinction";
}

function findPieceTypesBelongingToPlayer(
  board: Board,
  playerName: PlayerName
): PieceName[] {
  return uniq(board.piecesBelongingTo(playerName).map((piece) => piece.name));
}

function findSpeciesBelongingToPlayer(
  species: PieceName[][],
  board: Board,
  playerName: PlayerName
): PieceName[][] {
  const playerPieces = findPieceTypesBelongingToPlayer(board, playerName);
  return species.filter((s) => s.find((p) => playerPieces.includes(p)));
}

function updateExtinctionToken(game: Game, player: Player, species: PieceName[][]): void {
  const extinction = TokenName.Extinction;
  const oldExtinctionData = player.firstTokenWithName(extinction)?.data;
  const tokenIsOld =
    !oldExtinctionData?.turnNumber ||
    game.getCurrentHandoverTurn() - oldExtinctionData.turnNumber >= game.players.length;

  player.removeTokensByName(extinction);
  player.addToken({
    name: extinction,
    expired: () => false,
    data: {
      turnNumber: game.getCurrentHandoverTurn(),
      extinctionData: tokenIsOld
        ? findSpeciesBelongingToPlayer(species, game.board, player.name)
        : oldExtinctionData.extinctionData,
    },
  });
}
