import React, { useContext } from "react";
import { SFC, Colors } from "primitives";
import { View } from "react-native";
import { GameContext, PieceName } from "game";
import { Player } from "game/Player/Player";
import styled from "styled-components/native";
import { pieceDisplayOrder } from "game/displayInfo";
import { Piece } from "components/shared";

interface Props {
  player: Player;
}

const PIECE_SIZE = 25;
const PIECE_OVERLAP_SPACING = 10;

const PlayerPieceAdvantage: SFC<Props> = ({ player, style }) => {
  const { gameMaster } = useContext(GameContext);
  if (gameMaster === undefined) return null;
  const otherPlayers = gameMaster.game.players.filter(
    (otherPlayer) => otherPlayer !== player
  );
  const board = gameMaster.game.board;
  const pieceAdvantage = pieceDisplayOrder.map((pieceType) => {
    const pieces = board
      .piecesBelongingTo(player.name)
      .filter((piece) => piece.name === pieceType);
    return pieces.slice(
      0,
      Math.max(
        0,
        pieces.length -
          Math.min(
            ...otherPlayers.map(
              (otherPlayer) =>
                board
                  .piecesBelongingTo(otherPlayer.name)
                  .filter((piece) => piece.name === pieceType).length
            )
          )
      )
    );
  });

  return (
    <Container style={style}>
      {pieceAdvantage.map(
        (pieceGroup) =>
          pieceGroup.length > 0 &&
          pieceGroup[0].name !== PieceName.King && (
            <View
              style={{
                flexDirection: "row",
                width: PIECE_SIZE + (pieceGroup.length - 1) * PIECE_OVERLAP_SPACING,
              }}
            >
              {pieceGroup.map((piece) => (
                <View key={piece.id} style={{ width: PIECE_OVERLAP_SPACING }}>
                  <Piece
                    piece={piece}
                    color={Colors.PLAYER[piece.owner].string()}
                    outlineColor={"transparent"}
                    size={PIECE_SIZE}
                  />
                </View>
              ))}
            </View>
          )
      )}
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  flex-flow: row wrap;
`;

export { PlayerPieceAdvantage };
