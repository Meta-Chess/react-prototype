import React from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { TraitFilter } from "./TraitFilter";
import styled from "styled-components/native";
import { getTraitInfoForSet } from "./getTraitInfoForSet";
import { CollapsableCard } from "ui/Containers";
import { TraitsInSetInfo } from "game";
import { TraitName } from "game/variants/traitInfo";

interface Props {
  activeFilters: TraitName[];
  setActiveFilters: (x: TraitName[]) => void;
}

const FiltersCard: SFC<Props> = ({ activeFilters, setActiveFilters, style }) => {
  const traitsInSet: TraitsInSetInfo[] = getTraitInfoForSet();
  return (
    <CollapsableCard title={"Filters"} lastCardInStack={false} style={style}>
      <Container>
        {Object.values(traitsInSet).map((info) => (
          <TraitFilter
            key={info.name}
            trait={info.name}
            numberOfVariantsWithTrait={info.count}
            selected={activeFilters.includes(info.name)}
            onPress={(): void =>
              activeFilters.includes(info.name)
                ? setActiveFilters([])
                : setActiveFilters([info.name])
            }
            style={{ flexDirection: "row", margin: 4 }}
          />
        ))}
      </Container>
    </CollapsableCard>
  );
};

const Container = styled(View)`
  flex-flow: row wrap;
`;

export { FiltersCard };
