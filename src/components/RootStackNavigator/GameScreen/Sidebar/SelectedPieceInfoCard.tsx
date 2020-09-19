import React, { FC, useContext } from "react";
import { Text } from "primitives";
import { Card } from "ui/Containers/Card";
import { GameContext } from "game";
import { LabelWithDetails } from "ui";
import { View } from "react-native";
import { tokenDetails, pieceDetails } from "game/displayInfo";

const SelectedPieceInfoCard: FC = () => {
  const { gameMaster } = useContext(GameContext);
  const pieces = gameMaster?.selectedPieces;
  if (!pieces || pieces.length === 0) return null;

  return (
    <>
      {pieces.map((piece, index) => (
        <Card key={index}>
          <Text cat="DisplayL">{pieceDetails[piece.name].name} Selected</Text>
          {piece.tokens.length > 0 && (
            <Text cat="DisplayS" style={{ marginTop: 12 }}>
              Tokens
            </Text>
          )}
          <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            {piece.tokens.map((token, index) => (
              <LabelWithDetails label={tokenDetails[token.name].name} key={index} />
            ))}
          </View>
        </Card>
      ))}
    </>
  );
};
export { SelectedPieceInfoCard };
