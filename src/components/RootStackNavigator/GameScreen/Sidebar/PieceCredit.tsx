import React from "react";
import { View, Linking } from "react-native";
import { SFC, Colors, Text } from "primitives";

const pieceCreditLink = (
  <Text
    cat={"BodyXS"}
    style={{ color: Colors.INFO.toString() }}
    onPress={(): void => {
      Linking.openURL("https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces");
    }}
  >
    here
  </Text>
);

const creatorCreditLink = (
  <Text
    cat={"BodyXS"}
    style={{ color: Colors.INFO.toString() }}
    onPress={(): void => {
      Linking.openURL("https://en.wikipedia.org/wiki/User:Cburnett");
    }}
  >
    User:Cburnett
  </Text>
);

export const PieceCredit: SFC = ({ style }) => {
  return (
    <View style={style}>
      <Text
        cat="BodyXS"
        color={Colors.TEXT.LIGHT_SECONDARY.toString()}
        alignment="center"
      >
        Chess pieces originally by {creatorCreditLink} under creative commons license,
        found {pieceCreditLink}.
      </Text>
    </View>
  );
};
