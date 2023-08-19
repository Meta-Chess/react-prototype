import React, { useCallback, useMemo } from "react";
import { View } from "react-native";
import { SFC, Text, Colors } from "primitives";
import { FilterButton } from "./FilterButton";
import styled from "styled-components/native";
import { getOrderedFilterInfoForSet } from "./getOrdererdFilterInfoForSet";
import { CollapsableCard } from "ui/Containers";
import type { Filter, FilterValue, FilterOption } from "./filters";
import { getFilterInfoText } from "./filters";
import type { TraitName } from "game/variants/traitInfo";

interface Props {
  activeFilters: Filter[];
  setActiveFilters: (x: Filter[]) => void;
}

const FiltersCard: SFC<Props> = ({ activeFilters, setActiveFilters, style }) => {
  const { trait: traitFilterInfo, complexity: complexityFilterInfo } =
    getOrderedFilterInfoForSet();

  const findFilter = useCallback(
    (filterValue: FilterValue, filterOption?: FilterOption) => {
      return activeFilters.find((filter) => {
        const filterMatch = filter.value === filterValue;
        return filterOption ? filter.option === filterOption && filterMatch : filterMatch;
      });
    },
    [activeFilters]
  );

  const updateTraitFilter = useCallback(
    (trait: TraitName) => {
      const filter = findFilter(trait);
      if (!filter) {
        setActiveFilters([
          ...activeFilters,
          { type: "trait", value: trait, option: "include" },
        ]);
      } else if (filter.option == "include") {
        setActiveFilters([
          ...activeFilters.filter((activeFilter) => activeFilter.value !== trait),
          { type: "trait", value: trait, option: "exclude" },
        ]);
      } else {
        setActiveFilters(
          activeFilters.filter((activeFilter) => activeFilter.value !== trait)
        );
      }
    },
    [findFilter, activeFilters, setActiveFilters]
  );

  const updateComplexityFilter = useCallback(
    (complexity: number) => {
      const filter = findFilter(complexity);
      if (!filter) {
        setActiveFilters([
          ...activeFilters.filter((activeFilter) => activeFilter.type !== "complexity"),
          { type: "complexity", value: complexity, option: "include" },
        ]);
      } else {
        setActiveFilters(
          activeFilters.filter((activeFilter) => activeFilter.type !== "complexity")
        );
      }
    },
    [findFilter, activeFilters, setActiveFilters]
  );

  const filterMessage = useMemo(
    () => activeFilters.map((filter) => getFilterInfoText(filter)).join(" & "),
    [activeFilters]
  );

  return (
    <CollapsableCard title={"Filters"} style={style}>
      <Container>
        {Object.values(traitFilterInfo).map(
          (info) =>
            info.count > 0 && (
              <FilterButton
                key={info.value}
                filterType={"trait"}
                filterValue={info.value}
                filterCount={info.count}
                selected={!!findFilter(info.value)}
                selectedFilterOption={findFilter(info.value)?.option}
                onPress={(): void => updateTraitFilter(info.value)}
                style={{ flexDirection: "row", margin: 4 }}
              />
            )
        )}
      </Container>
      <Container style={{ marginTop: 4 }}>
        {Object.values(complexityFilterInfo).map(
          (info) =>
            info.count > 0 && (
              <FilterButton
                key={info.value}
                filterType={"complexity"}
                filterValue={info.value}
                filterCount={info.count}
                selected={!!findFilter(info.value)}
                selectedFilterOption={findFilter(info.value)?.option}
                onPress={(): void => updateComplexityFilter(info.value)}
                style={{ flexDirection: "row", margin: 4 }}
              />
            )
        )}
      </Container>
      {activeFilters.length > 0 && (
        <Text
          color={Colors.TEXT.LIGHT_SECONDARY.toString()}
          cat="BodyXS"
          style={{ margin: 4 }}
        >
          {filterMessage}
        </Text>
      )}
    </CollapsableCard>
  );
};

const Container = styled(View)`
  flex-flow: row wrap;
`;

export { FiltersCard };
