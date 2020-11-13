import React from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { traitInfo, TraitClasses } from "game/types";
import { FilterDisplay } from "./FilterDisplay";
import { TraitFilterRow } from "./TraitFilterRow";
import { CoverMessyShadow } from "./CoverMessyShadow";

interface Props {
  activeFilters: React.ReactText[];
  setActiveFilters: (x: TraitClasses[]) => void;
}

const TraitFilterBar: SFC<Props> = ({ activeFilters, setActiveFilters }) => {
  const filterDisplayTitle =
    activeFilters.length === 0
      ? "No Filters"
      : traitInfo[activeFilters[0] as keyof typeof traitInfo].name;
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
      <CoverMessyShadow
        filterBarHeight={filterBarHeight}
        filterBarWidth={filterBarWidth}
      />
    </View>
  );
};

export { TraitFilterBar };
