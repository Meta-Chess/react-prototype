import React, { FC } from "react";
import { Text } from "primitives";
import { Card } from "ui/Containers/Card";
import { Piece } from "game";
import { LabelWithDetails } from "ui";
import { View } from "react-native";
import { tokenDetails, pieceDetails } from "game/displayInfo";

interface Props {
  pieces?: Piece[];
}

const SelectedPieceInfoCard: FC<Props> = ({ pieces }) => {
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
              <LabelWithDetails
                label={tokenDetails[token.name].name}
                details={tokenDetails[token.name].description}
                key={index}
              />
            ))}
          </View>
        </Card>
      ))}
    </>
  );
};
export { SelectedPieceInfoCard };
