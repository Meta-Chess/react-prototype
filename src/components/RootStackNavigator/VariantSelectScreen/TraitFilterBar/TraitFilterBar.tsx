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
  filterBarHeight: number;
  filterBarWidth: number;
}

const TraitFilterBar: SFC<Props> = ({
  style,
  activeFilters,
  setActiveFilters,
  filterBarHeight,
  filterBarWidth,
}) => {
  const filterDisplayTitle =
    activeFilters.length === 0
      ? "No Filters"
      : titleUppercase(activeFilters[0].toString());
  return (
    <View
      style={[
        style,
        {
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column-reverse",
        },
      ]}
    >
      <TraitFilterRow
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        filterBarHeight={filterBarHeight}
        filterBarWidth={filterBarWidth}
      />
      <FilterDisplay filterDisplayTitle={filterDisplayTitle} />
    </View>
  );
};

export { TraitFilterBar };
