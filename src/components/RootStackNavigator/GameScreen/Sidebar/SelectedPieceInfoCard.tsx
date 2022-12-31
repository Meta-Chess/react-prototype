import React from "react";
import { SFC, Text } from "primitives";
import { Block } from "ui/Containers/Block";
import { Piece, pieceDetails, tokenDetails } from "game";
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
        <Block
          key={index}
          title={pieceDetails[piece.name].name + " Selected"}
          style={style}
        >
          {piece.tokens.length > 0 && (
            <Text cat="BodyM" style={{ marginTop: 12 }}>
              Tokens
            </Text>
          )}
          <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            {piece.tokens.map((token, index) => (
              <LabelWithDetails
                label={tokenDetails[token.name].name}
                details={tokenDetails[token.name].description}
                key={index}
                style={{ marginLeft: index === 0 ? 0 : 4, marginTop: 4 }}
              />
            ))}
          </View>
        </Block>
      ))}
    </>
  );
};
export { SelectedPieceInfoCard };
