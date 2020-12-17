import React from "react";
import { SFC, Text } from "primitives";
import { Card } from "ui/Containers/Card";
import { Piece } from "game";
import { LabelWithDetails } from "ui";
import { View } from "react-native";
import { tokenDetails, pieceDetails } from "game/displayInfo";

interface Props {
  pieces?: Piece[];
}

const SelectedPieceInfoCard: SFC<Props> = ({ pieces, style }) => {
  if (!pieces || pieces.length === 0) return null;

  return (
    <>
      {pieces.map((piece, index) => (
        <Card key={index} style={style}>
          <Text cat="DisplayM">{pieceDetails[piece.name].name} Selected</Text>
          {piece.tokens.length > 0 && (
            <Text cat="BodyL" style={{ marginTop: 12 }}>
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
