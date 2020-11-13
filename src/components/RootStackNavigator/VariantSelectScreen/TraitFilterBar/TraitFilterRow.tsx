import React from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { TraitFilter } from "./TraitFilter";
import { traitInfo, TraitClasses } from "game/types";

interface Props {
  activeFilters: React.ReactText[];
  setActiveFilters: (x: TraitClasses[]) => void;
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
    <View
      style={{
        minHeight: filterBarHeight,
        maxHeight: filterBarHeight,
        maxWidth: filterBarWidth,
        minWidth: filterBarWidth,
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 6,
        shadowColor: Colors.BLACK.toString(),
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        backgroundColor: Colors.DARKER.toString(),
      }}
    >
      {Object.keys(traitInfo).map((trait: string, index: number) => (
        <TraitFilter
          key={index}
          trait={trait}
          unselected={!activeFilters.some((filt) => filt === trait)}
          onPress={(): void =>
            activeFilters.some((filt) => filt === trait)
              ? setActiveFilters([])
              : setActiveFilters([trait as TraitClasses])
          }
        />
      ))}
    </View>
  );
};

export { TraitFilterRow };
