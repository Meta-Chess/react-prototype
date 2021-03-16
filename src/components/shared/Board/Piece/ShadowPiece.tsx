import React, { FC, useContext } from "react";
import { View, Image } from "react-native";
import { Piece as PieceClass, TokenName, PlayerName } from "game";
import { PieceImage, Colors, BlackCircle } from "primitives";
import { AbsoluteView } from "ui";
import { GameContext } from "components/shared";

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
          rotatePiece={gameMaster?.overTheBoard && piece.owner === PlayerName.Black}
          opacity={
            piece.hasTokenWithName(TokenName.Fatigue) &&
            gameMaster?.getRuleNames().includes("fatigue")
              ? 0.03
              : 0.075
          }
        />
      </AbsoluteView>
    </View>
  );
};

export { ShadowPiece };
