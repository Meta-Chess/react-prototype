import React from "react";
import { View } from "react-native";
import { Colors, SFC, Text } from "primitives";
import { TraitClass } from "game/variants";
import { TraitFilterRow } from "./TraitFilterRow";
import { titleUppercase } from "utilities";

interface Props {
  activeFilters: TraitClass[];
  setActiveFilters: (x: TraitClass[]) => void;
}

const TraitFilterBar: SFC<Props> = ({ activeFilters, setActiveFilters, style }) => {
  const filterDisplayTitle =
    activeFilters.length === 0
      ? "No Filters"
      : titleUppercase(activeFilters[0].toString());
  return (
    <View style={[style, { alignItems: "center" }]}>
      <Text cat={"DisplayS"} weight="heavy" color={Colors.TEXT.LIGHT.toString()}>
        {filterDisplayTitle}
      </Text>
      <TraitFilterRow
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        style={{ marginTop: 8 }}
      />
    </View>
  );
};

export { TraitFilterBar };
