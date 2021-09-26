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
import { useUserSettings } from "components/shared";
import { useCalculatedDimensions } from "components/shared/useCalculatedDimensions";

const TILE_SIZE = 200;

interface Props {
  displayVariants: FutureVariantName[];
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  conflictLevel: ConflictLevel | undefined;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  ruleNamesWithParams?: RuleNamesWithParams;
}

const VariantCardGrid: SFC<Props> = ({
  style,
  displayVariants,
  selectedVariants,
  setSelectedVariants,
  conflictLevel,
  setVariantModalInfo,
  ruleNamesWithParams = {},
}) => {
  const [detailedView, setDetailedView] = useUserSettings("showDetailedView", false);
  const [zenMode, setZenMode] = useUserSettings("zenMode", false);
  const ref = useRef<View>(null);
  const [width] = useCalculatedDimensions(ref);
  const numberOfTilesPerRow = useMemo(() => Math.floor(width / TILE_SIZE), [width]) || 3;
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
            {displayVariants.map((variant, i) => {
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
                      ? setSelectedVariants(selectedVariants.filter((x) => x !== variant))
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

      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          bottom: 20,
          width: 70,
          height: 40,
          backgroundColor: Colors.DARKISH.toString(),
          borderRadius: 10,
        }}
      >
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
      </View>
    </View>
  );
};

export { VariantCardGrid };
