import React, { FC, useContext } from "react";
import { View, Image } from "react-native";
import { GameContext } from "game";
import { PieceImage, Colors, BlackCircle } from "primitives";
import { Piece as PieceClass } from "game/Board";
import { TokenName, Player } from "game/types";
import { AbsoluteView } from "ui";

interface Props {
  piece: PieceClass;
  size: number;
}

const ShadowPiece: FC<Props> = ({ piece, size }) => {
  const { gameMaster } = useContext(GameContext);
  return (
    <View style={{ width: size, height: size }}>
      <AbsoluteView>
        <Image
          style={{ width: size, height: size }}
          source={BlackCircle}
          blurRadius={24}
        />
      </AbsoluteView>
      <AbsoluteView>
        <PieceImage
          type={piece.name}
          color={Colors.PLAYER[piece.owner].string()}
          size={size}
          rotatePiece={gameMaster?.overTheBoard && piece.owner === Player.Black}
          opacity={piece.hasTokenWithName(TokenName.Fatigue) ? 0.03 : 0.075}
        />
      </AbsoluteView>
    </View>
  );
};

export { ShadowPiece };
