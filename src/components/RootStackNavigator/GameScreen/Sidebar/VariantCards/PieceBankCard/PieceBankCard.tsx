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
        {players.map((player, index) => {
          const pieces = orderedPieceBankPieces(gameMaster, player.name);
          return (
            <View key={player.name}>
              <Text
                cat="BodyM"
                color={Colors.TEXT.LIGHT.toString()}
                style={{ minWidth: pieces.length === 0 ? 0 : 55 }}
              >
                {PlayerDisplayNames[player.name]}
              </Text>
              <PieceBank
                pieces={pieces}
                pieceSize={pieceSize}
                gameMaster={gameMaster}
                style={{
                  marginLeft: 8,
                  marginBottom: index === players.length - 1 ? 0 : 4,
                }}
              />
            </View>
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
