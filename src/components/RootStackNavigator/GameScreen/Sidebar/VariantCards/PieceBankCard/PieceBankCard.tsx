import React from "react";
import { SFC, Text, Colors } from "primitives";
import { Card } from "ui/Containers/Card";
import { GameMaster } from "game";
import { Piece } from "game/Board";
import { LocationPrefix } from "game/Board/location";
import { View } from "react-native";
import { PlayerName, PlayerDisplayNames } from "game/types";
import { PieceBank } from "./PieceBank";
import styled from "styled-components/native";
import { pieceDisplayOrder } from "game/displayInfo";

interface Props {
  gameMaster: GameMaster;
}

const PieceBankCard: SFC<Props> = ({ gameMaster, style }) => {
  const players = gameMaster.game.players;
  const pieceSize = 40;
  return (
    <Card style={style}>
      <Text cat="DisplayM">Piece Bank</Text>
      <PlayerBankContainer>
        {players.map((player) => {
          const pieces = orderedPieceBankPieces(gameMaster, player.name);
          return (
            <Container key={player.name}>
              <PlayerTitleContainer empty={pieces.length === 0}>
                <Text
                  cat="BodyM"
                  color={Colors.TEXT.LIGHT.toString()}
                  style={{ minWidth: pieces.length === 0 ? 0 : 60 }}
                >
                  {PlayerDisplayNames[player.name]}
                </Text>
                {pieces.length === 0 && (
                  <Text
                    cat="BodyS"
                    color={Colors.TEXT.LIGHT_SECONDARY.toString()}
                    style={{ fontStyle: "italic", paddingLeft: 15 }}
                  >
                    {"no pieces captured"}
                  </Text>
                )}
              </PlayerTitleContainer>
              <PieceBank
                pieces={pieces}
                pieceSize={pieceSize}
                gameMaster={gameMaster}
                style={{ flex: 1, paddingLeft: 10 }}
              />
            </Container>
          );
        })}
      </PlayerBankContainer>
    </Card>
  );
};

export { PieceBankCard };

const PlayerBankContainer = styled(View)`
  margin-top: 6px;
`;

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const PlayerTitleContainer = styled(View)<{ empty: boolean }>`
  justify-content: center;
  flex-direction: row;
`;

function orderedPieceBankPieces(gameMaster: GameMaster, player: PlayerName): Piece[] {
  //maybe have a visual interruption point to remove this duplication (piece bank location stated here and in crazyhouse)
  const pieceBankLocation = LocationPrefix.pieceBank + player;
  const pieces = gameMaster.game.board
    .getPiecesAt(pieceBankLocation)
    .sort((p1, p2) =>
      pieceDisplayOrder.indexOf(p1.name) < pieceDisplayOrder.indexOf(p2.name) ? -1 : 1
    );
  return pieces;
}
