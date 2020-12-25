import React from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { TraitFilter } from "./TraitFilter";
import { TraitName } from "game/variants";
import styled from "styled-components/native";
import { Styles } from "primitives/Styles";
import { getTraitInfoForSet } from "./getTraitInfoForSet";
import { TraitsInSetInfo } from "game/types";

interface Props {
  activeFilters: TraitName[];
  setActiveFilters: (x: TraitName[]) => void;
}

const TraitFilterRow: SFC<Props> = ({ activeFilters, setActiveFilters, style }) => {
  const traitsInSet: TraitsInSetInfo[] = getTraitInfoForSet();
  return (
    <RowContainer style={style}>
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
          style={{ flexDirection: "row", margin: 12 }}
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
