import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "primitives";

export const Practice: FC = () => {
  return (
    <View style={{ backgroundColor: "#444444", width: 500, height: 500, padding: 10 }}>
      <View
        style={{
          backgroundColor: "#888888",
          width: "100%",
          height: "20%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text cat="DisplayL">White Wins! </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "#666666", marginTop: 10 }} />
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "#44cc77",
            flex: 3,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text cat="DisplayL">OK. </Text>
        </View>
        <View
          style={{
            backgroundColor: "#cc4444",
            flex: 7,
            height: 80,
            marginLeft: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text cat="DisplayL">Rematch! </Text>
        </View>
      </View>
    </View>
  );
};
