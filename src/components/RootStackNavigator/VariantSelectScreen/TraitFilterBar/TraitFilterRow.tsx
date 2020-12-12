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

const TraitFilterRow: SFC<Props> = ({ activeFilters, setActiveFilters, style }) => {
  return (
    <RowContainer style={style}>
      {Object.keys(traitInfo)
        .map((trait) => trait as TraitClass)
        .map((trait: TraitClass, index: number) => (
          <TraitFilter
            key={index}
            trait={trait}
            selected={activeFilters.includes(trait)}
            onPress={(): void =>
              activeFilters.includes(trait)
                ? setActiveFilters([])
                : setActiveFilters([trait as TraitClass])
            }
            style={{ margin: 12 }}
          />
        ))}
    </RowContainer>
  );
};

const RowContainer = styled(View)`
  flex-direction: row;
  padding-horizontal: 16px;
  border-radius: 6px;
  ${Styles.BOX_SHADOW}
  background-color: ${Colors.DARKER.toString()};
`;

export { TraitFilterRow };
