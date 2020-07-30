import React, { FC } from "react";
import { View, Text, Linking } from "react-native";

const pieceCreditLink = (
  <Text
    style={{ color: "blue" }}
    onPress={(): void => {
      Linking.openURL(
        "https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces"
      );
    }}
  >
    here
  </Text>
);

const creatorCreditLink = (
  <Text
    style={{ color: "blue" }}
    onPress={(): void => {
      Linking.openURL("https://en.wikipedia.org/wiki/User:Cburnett");
    }}
  >
    User:Cburnett
  </Text>
);

export const PieceCredit: FC = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <Text>
        Chess pieces originally by {creatorCreditLink} under creative commons
        license, found {pieceCreditLink}.
      </Text>
    </View>
  );
};
