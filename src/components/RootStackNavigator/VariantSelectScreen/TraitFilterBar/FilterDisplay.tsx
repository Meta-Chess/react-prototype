import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";
import { Colors, Text } from "primitives";

interface FilterDisplayProps {
  filterDisplayTitle: string;
}

const FilterDisplay: SFC<FilterDisplayProps> = ({ filterDisplayTitle }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 6,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          alignSelf: "center",
          borderRadius: 6,
          shadowColor: Colors.BLACK.toString(),
          shadowRadius: 4,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          backgroundColor: Colors.DARKER.toString(),
          position: "absolute",
        }}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          marginTop: 15,
          alignSelf: "center",
          backgroundColor: Colors.DARKER.toString(),
          position: "absolute",
        }}
      />
      <View>
        <Text cat={"DisplayS"} weight="heavy" color={Colors.TEXT.LIGHT.toString()}>
          {filterDisplayTitle}
        </Text>
      </View>
    </View>
  );
};

export { FilterDisplay };
