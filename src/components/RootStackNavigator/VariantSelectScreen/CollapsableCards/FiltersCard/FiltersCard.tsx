import React from "react";
import { View } from "react-native";
import { SFC, Text, Colors } from "primitives";
import { TraitFilter } from "./TraitFilter";
import styled from "styled-components/native";
import { getTraitInfoForSet } from "./getTraitInfoForSet";
import { CollapsableCard } from "ui/Containers";
import { TraitsInSetInfo } from "game";
import { TraitName, traitInfo } from "game/variants/traitInfo";
import { BoardVariantName } from "game/boards";
import { FormatName } from "game/formats";
interface Props {
  userFilters: TraitName[];
  setUserFilters: (x: TraitName[]) => void;
  selectedFormat: FormatName;
  selectedBoard: BoardVariantName;
}

const FiltersCard: SFC<Props> = ({
  userFilters,
  setUserFilters,
  selectedFormat,
  selectedBoard,
  style,
}) => {
  const traitsInSet: TraitsInSetInfo[] = getTraitInfoForSet(
    selectedFormat,
    selectedBoard
  );
  return (
    <CollapsableCard title={"Filters"} style={style}>
      <Container>
        {Object.values(traitsInSet).map((info) => (
          <TraitFilter
            key={info.name}
            trait={info.name}
            numberOfVariantsWithTrait={info.count}
            selected={userFilters.includes(info.name)}
            onPress={(): void =>
              userFilters.includes(info.name)
                ? setUserFilters([])
                : setUserFilters([info.name])
            }
            style={{ flexDirection: "row", margin: 4 }}
          />
        ))}
      </Container>
      {userFilters.length > 0 && (
        <Text
          color={Colors.TEXT.LIGHT_SECONDARY.toString()}
          cat="BodyXS"
          style={{ fontStyle: "italic", marginVertical: 6, marginLeft: 8 }}
        >
          {userFilters[0] + ": " + traitInfo[userFilters[0]].description}
        </Text>
      )}
    </CollapsableCard>
  );
};

const Container = styled(View)`
  flex-flow: row wrap;
`;

export { FiltersCard };
