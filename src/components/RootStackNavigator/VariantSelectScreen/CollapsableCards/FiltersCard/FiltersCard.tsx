import React, { useCallback, useMemo } from "react";
import { View } from "react-native";
import { SFC, Text, Colors } from "primitives";
import { TraitFilter } from "./TraitFilter";
import styled from "styled-components/native";
import { getTraitInfoForSet } from "./getTraitInfoForSet";
import { CollapsableCard } from "ui/Containers";
import { TraitsInSetInfo } from "game";
import type { Filter, FilterValue, FilterOption, FilterType } from "./filters";
import { getFilterInfoText } from "./filters";

interface Props {
  activeFilters: Filter[];
  setActiveFilters: (x: Filter[]) => void;
}

const FiltersCard: SFC<Props> = ({ activeFilters, setActiveFilters, style }) => {
  const traitsInSet: TraitsInSetInfo[] = getTraitInfoForSet();

  const findFilter = useCallback(
    (filterValue: FilterValue, filterOption?: FilterOption) => {
      return activeFilters.find((filter) => {
        const filterMatch = filter.value === filterValue;
        return filterOption ? filter.option === filterOption && filterMatch : filterMatch;
      });
    },
    [activeFilters]
  );

  const updateFilter = useCallback(
    (filterType: FilterType, filterValue: FilterValue) => {
      const filter = findFilter(filterValue);
      if (!filter) {
        setActiveFilters([
          ...activeFilters,
          { type: filterType, value: filterValue, option: "include" } as Filter,
        ]);
      } else if (filter.option == "include") {
        setActiveFilters([
          ...activeFilters.filter((activeFilter) => activeFilter.value !== filterValue),
          { type: filterType, value: filterValue, option: "exclude" } as Filter,
        ]);
      } else {
        setActiveFilters(
          activeFilters.filter((activeFilter) => activeFilter.value !== filterValue)
        );
      }
    },
    [findFilter, activeFilters, setActiveFilters]
  );

  const filterMessage = useMemo(
    () => activeFilters.map((filter) => getFilterInfoText(filter)).join(" AND "),
    [activeFilters]
  );

  return (
    <CollapsableCard title={"Filters"} style={style}>
      <Container>
        {Object.values(traitsInSet).map(
          (info) =>
            info.count > 0 && (
              <TraitFilter
                key={info.name}
                trait={info.name}
                numberOfVariantsWithTrait={info.count}
                selected={!!findFilter(info.name)}
                selectedFilterOption={findFilter(info.name)?.option}
                onPress={(): void => updateFilter("trait", info.name)}
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
