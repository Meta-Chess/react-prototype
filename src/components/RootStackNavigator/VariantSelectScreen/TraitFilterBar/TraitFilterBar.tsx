import React from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { TraitClass } from "game/types";
import { FilterDisplay } from "./FilterDisplay";
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
      <FilterDisplay filterDisplayTitle={filterDisplayTitle} />
      <TraitFilterRow activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
    </View>
  );
};

export { TraitFilterBar };
