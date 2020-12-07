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

const TraitFilterBar: SFC<Props> = ({ activeFilters, setActiveFilters }) => {
  const filterDisplayTitle =
    activeFilters.length === 0
      ? "No Filters"
      : titleUppercase(activeFilters[0].toString());
  const filterBarHeight = 48;
  const filterBarWidth = 375;
  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "column-reverse",
        marginVertical: 24,
        paddingBottom: 6,
      }}
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
