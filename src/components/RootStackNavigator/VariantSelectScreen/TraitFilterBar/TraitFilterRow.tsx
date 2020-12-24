import React from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { TraitFilter } from "./TraitFilter";
import { TraitName } from "game/variants";
import styled from "styled-components/native";
import { Styles } from "primitives/Styles";
import { getTraitInfoForSet } from "./getTraitInfoForSet";

interface Props {
  activeFilters: TraitName[];
  setActiveFilters: (x: TraitName[]) => void;
}

const TraitFilterRow: SFC<Props> = ({ activeFilters, setActiveFilters, style }) => {
  const traitsInSet: [TraitName, number][] = getTraitInfoForSet();
  return (
    <RowContainer style={style}>
      {traitsInSet.map((info) => (
        <TraitFilter
          key={info[0]}
          trait={info[0]}
          numTraitInSet={info[1]}
          selected={activeFilters.includes(info[0])}
          onPress={(): void =>
            activeFilters.includes(info[0])
              ? setActiveFilters([])
              : setActiveFilters([info[0]])
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
