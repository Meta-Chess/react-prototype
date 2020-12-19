import React, { useContext } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { SFC, Text } from "primitives";
import { GameContext } from "game";
import { PlayerDisplayNames } from "game/types";

export const WinModal: SFC = () => {
  const { gameMaster } = useContext(GameContext);
  return (
    <View
      style={{
        width: 500,
        maxHeight: 500,
        padding: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "#888888",
          width: "100%",
          height: "20%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
      >
        <Text cat="DisplayL"> {gameMaster?.result} </Text>
      </View>
      <ScrollView style={{ flex: 1, marginTop: 10 }} showsVerticalScrollIndicator={false}>
        {gameMaster?.game.players
          .filter((player) => !player.alive)
          .map((player, index) => (
            <View
              key={player.name}
              style={{
                width: "100%",
                height: "60",
                marginTop: index === 0 ? 0 : 10,
                backgroundColor: "#aaaaaa",
                borderRadius: 5,
              }}
            >
              <Text cat="DisplayM" style={{ padding: 10 }}>
                {PlayerDisplayNames[player.name] + player.endGameMessage}
              </Text>
            </View>
          ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          height: "20%",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#44cc77",
            flex: 3,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
          onPress={(): void => {
            gameMaster?.hideModal();
          }}
        >
          <Text cat="DisplayL">OK. </Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#cc4444",
            flex: 7,
            height: "100%",
            marginLeft: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
        >
          <Text cat="DisplayL">Rematch! </Text>
        </View>
      </View>
    </View>
  );
};
