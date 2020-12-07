import React from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { TraitFilter } from "./TraitFilter";
import { traitInfo, TraitClass } from "game/types";
import styled from "styled-components/native";

interface Props {
  activeFilters: TraitClass[];
  setActiveFilters: (x: TraitClass[]) => void;
  filterBarHeight: number;
  filterBarWidth: number;
}

const TraitFilterRow: SFC<Props> = ({
  activeFilters,
  setActiveFilters,
  filterBarHeight,
  filterBarWidth,
}) => {
  return (
    <RowContainer filterBarHeight={filterBarHeight} filterBarWidth={filterBarWidth}>
      {Object.keys(traitInfo)
        .map((trait) => trait as TraitClass)
        .map((trait: TraitClass, index: number) => (
          <TraitFilter
            key={index}
            trait={trait}
            selected={activeFilters.some((filt) => filt === trait)}
            onPress={(): void =>
              activeFilters.some((filt) => filt === trait)
                ? setActiveFilters([])
                : setActiveFilters([trait as TraitClass])
            }
          />
        ))}
    </RowContainer>
  );
};

interface ContainerProps {
  filterBarHeight: number;
  filterBarWidth: number;
}

const RowContainer = styled(View)<ContainerProps>`
  min-height: ${({ filterBarHeight }): number => filterBarHeight};
  max-height: ${({ filterBarHeight }): number => filterBarHeight};
  min-width: ${({ filterBarWidth }): number => filterBarWidth};
  max-width: ${({ filterBarWidth }): number => filterBarWidth};
  justify-content: space-evenly;
  flex-direction: row;
  align-self: center;
  align-items: center;
  padding-horizontal: 10;
  border-radius: 6;
  shadow-color: ${Colors.BLACK.toString()};
  shadow-radius: 4px;
  box-shadow: 0px 1px 2px;
  background-color: ${Colors.DARKER.toString()};
`;

export { TraitFilterRow };
