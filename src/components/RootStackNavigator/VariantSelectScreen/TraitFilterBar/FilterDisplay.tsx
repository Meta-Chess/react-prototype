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
      <Text cat={"DisplayS"} weight="heavy" color={Colors.TEXT.LIGHT.toString()}>
        {filterDisplayTitle}
      </Text>
    </View>
  );
};

export { FilterDisplay };
