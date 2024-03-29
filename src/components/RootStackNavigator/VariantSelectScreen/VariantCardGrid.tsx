import React, { useCallback, useMemo, useRef } from "react";
import { View, ScrollView } from "react-native";
import { SFC, Colors } from "primitives";
import { VariantTile } from "ui/Pressable/VariantTile";
import { ConflictLevel, FutureVariantName, futureVariants } from "game";
import { VariantModalInfo } from "./Modals";
import { RuleNamesWithParams } from "game/CompactRules";
import { doGameOptionsModifyVariant } from "game/variantAndRuleProcessing";
import { IconButton } from "ui/Buttons/IconButton";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { GiNinjaStar } from "react-icons/gi";
import { FcClearFilters } from "react-icons/fc";
import { useUserSettings } from "components/shared";
import { useCalculatedDimensions } from "components/shared/useCalculatedDimensions";
import type { Filter } from "./CollapsableCards/FiltersCard/filters";
import styled from "styled-components/native";

const TILE_SIZE = 200;

interface Props {
  displayVariants: FutureVariantName[];
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  activeFilters: Filter[];
  setActiveFilters: (x: Filter[]) => void;
  conflictLevel: ConflictLevel | undefined;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  ruleNamesWithParams?: RuleNamesWithParams;
}

const VariantCardGrid: SFC<Props> = ({
  style,
  displayVariants,
  selectedVariants,
  setSelectedVariants,
  activeFilters,
  setActiveFilters,
  conflictLevel,
  setVariantModalInfo,
  ruleNamesWithParams = {},
}) => {
  const [detailedView, setDetailedView] = useUserSettings("showDetailedView", false);
  const [zenMode, setZenMode] = useUserSettings("zenMode", false);
  const ref = useRef<View>(null);
  const [width] = useCalculatedDimensions(ref);
  const numberOfTilesPerRow = useMemo(() => Math.floor(width / TILE_SIZE), [width]);
  const row = useCallback(
    (index: number) => Math.floor(index / numberOfTilesPerRow),
    [numberOfTilesPerRow]
  );

  return (
    <View style={style}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 80,
        }}
      >
        <View ref={ref} style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: TILE_SIZE * numberOfTilesPerRow,
            }}
          >
            {!!width &&
              displayVariants.map((variant, i) => {
                return (
                  <VariantTile
                    key={variant}
                    size={TILE_SIZE}
                    detailedView={detailedView}
                    zenMode={zenMode}
                    color={
                      ((i % 2) + (row(i) % 2) * ((numberOfTilesPerRow + 1) % 2)) % 2 === 0
                        ? Colors.DARK
                        : Colors.DARKER
                    }
                    variant={futureVariants[variant]}
                    selected={selectedVariants.includes(variant)}
                    conflictLevel={conflictLevel}
                    onPress={(): void =>
                      selectedVariants.includes(variant)
                        ? setSelectedVariants(
                            selectedVariants.filter((x) => x !== variant)
                          )
                        : setSelectedVariants([...selectedVariants, variant])
                    }
                    setVariantModalInfo={setVariantModalInfo}
                    modified={doGameOptionsModifyVariant(
                      futureVariants[variant],
                      ruleNamesWithParams
                    )}
                  />
                );
              })}
          </View>
        </View>
      </ScrollView>

      <DetailViewButtonContainer>
        <IconButton
          size={30}
          color={Colors.WHITE}
          Icon={zenMode ? GiNinjaStar : detailedView ? GoEye : GoEyeClosed}
          onPress={(): void => {
            if (zenMode) setZenMode(false);
            else setDetailedView(!detailedView);
          }}
          onLongPress={(): void => setZenMode(!zenMode)}
        />
      </DetailViewButtonContainer>
      {activeFilters.length !== 0 && (
        <ActiveFilterButtonContainer>
          <IconButton
            size={20}
            color={Colors.WHITE}
            Icon={FcClearFilters}
            onPress={(): void => {
              setActiveFilters([]);
            }}
          />
        </ActiveFilterButtonContainer>
      )}
    </View>
  );
};

const FloatingButtonContainer = styled(View)`
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: 20px;
  background-color: ${Colors.DARKISH.toString()};
  border-radius: 10px;
`;

const DetailViewButtonContainer = styled(FloatingButtonContainer)`
  align-self: center;
  width: 70px;
  height: 40px;
`;

const ActiveFilterButtonContainer = styled(FloatingButtonContainer)`
  right: 20px;
  width: 40px;
  height: 40px;
`;

export { VariantCardGrid };
