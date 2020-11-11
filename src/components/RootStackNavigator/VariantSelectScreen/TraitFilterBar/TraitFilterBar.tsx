import React from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { TraitFilter } from "./TraitFilter";
import { traitColors, TraitClasses } from "game/types";

interface Props {
  activeFilters: React.ReactText[];
  setActiveFilters: (x: TraitClasses[]) => void;
}

const TraitFilterBar: SFC<Props> = ({ activeFilters, setActiveFilters }) => {
  return (
    <View
      style={{
        height: 48,
        maxWidth: 375,
        minWidth: 375,
        marginVertical: 24,
        backgroundColor: Colors.DARKER.toString(),
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        flex: 1,
        borderRadius: 6,
        shadowColor: Colors.BLACK.toString(),
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        paddingHorizontal: 10,
      }}
    >
      {Object.keys(traitColors).map((trait: string, index: number) => (
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

export { TraitFilterBar };
