import React from "react";
import { SFC, Text, Colors } from "primitives";
import { Card } from "ui/Containers/Card";
import { Piece, tokenDetails, pieceDetails } from "game";
import { LabelWithDetails } from "ui";
import { View } from "react-native";

interface Props {
  pieces?: Piece[];
}

const SelectedPieceInfoCard: SFC<Props> = ({ pieces, style }) => {
  if (!pieces || pieces.length === 0) return null;

  return (
    <>
      {pieces.map((piece, index) => (
        <Card
          key={index}
          title={pieceDetails[piece.name].name + " Selected"}
          style={style}
        >
          {piece.tokens.length > 0 && (
            <Text
              cat="BodyM"
              color={Colors.TEXT.LIGHT.toString()}
              style={{ marginTop: 12 }}
            >
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
