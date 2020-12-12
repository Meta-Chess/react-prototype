import React from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { TraitFilter } from "./TraitFilter";
import { traitInfo, TraitClass } from "game/types";
import styled from "styled-components/native";
import { Styles } from "primitives/Styles";

interface Props {
  activeFilters: TraitClass[];
  setActiveFilters: (x: TraitClass[]) => void;
}

const TraitFilterRow: SFC<Props> = ({ activeFilters, setActiveFilters }) => {
  return (
    <RowContainer>
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

const RowContainer = styled(View)`
  width: 375;
  height: 48;
  justify-content: space-evenly;
  flex-direction: row;
  align-self: center;
  align-items: center;
  padding-horizontal: 10px;
  border-radius: 6px;
  ${Styles.BOX_SHADOW}
  background-color: ${Colors.DARKER.toString()};
`;

export { TraitFilterRow };
