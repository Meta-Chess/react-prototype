import React from "react";
import { Colors, SFC, Text } from "primitives";
import { TouchableOpacity, View } from "react-native";
import { traitInfo } from "game/variants/traitInfo";
import styled from "styled-components/native";
import Color from "color";
import type { FilterOption, FilterType, FilterValue, TraitFilter } from "./filters";
import { StarIcon } from "primitives/icons";
import { TextIcon } from "ui";

interface FilterButtonProps {
  filterType: FilterType;
  filterValue: FilterValue;
  filterCount: number;
  selected: boolean;
  onPress: () => void;
  selectedFilterOption?: FilterOption;
}

const getButtonColor = (filterType: FilterType, filterValue: FilterValue): Color => {
  switch (filterType) {
    case "trait":
      return traitInfo[filterValue as TraitFilter["value"]].color;
    case "complexity":
      return Colors.MCHESS_BLUE;
  }
};

const getButtonSizing = (
  filterType: FilterType
): {
  labelPadding: number;
  counterPadding: number;
  verticalPadding: number;
} => {
  switch (filterType) {
    case "trait":
      return { labelPadding: 4, counterPadding: 4, verticalPadding: 1 };
    case "complexity":
      return { labelPadding: 5, counterPadding: 4, verticalPadding: 4 };
  }
};

const FilterButton: SFC<FilterButtonProps> = ({
  filterType,
  filterValue,
  filterCount,
  style,
  selected,
  selectedFilterOption,
  onPress,
}) => {
  const color = getButtonColor(filterType, filterValue).fade(0.4);
  const { labelPadding, counterPadding, verticalPadding } = getButtonSizing(filterType);
  return (
    <TouchableLabel
      labelPadding={labelPadding}
      counterPadding={counterPadding}
      verticalPadding={verticalPadding}
      style={style}
      color={color}
      selected={selected}
      selectedBorderColor={
        selectedFilterOption === "exclude" ? Colors.ERROR : Colors.GREY
      }
      onPress={onPress}
    >
      <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT.toString()} selectable={false}>
        {filterValue.toString()}
      </Text>

      {filterType === "complexity" && (
        <TextIcon Icon={StarIcon} style={{ marginTop: 1 }} />
      )}
      <CountContainer
        labelPadding={labelPadding}
        counterPadding={counterPadding}
        verticalPadding={verticalPadding}
        selected={selected}
      >
        <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT.toString()} selectable={false}>
          {filterCount.toString()}
        </Text>
      </CountContainer>
    </TouchableLabel>
  );
};

const TouchableLabel = styled(TouchableOpacity)<{
  color: Color;
  labelPadding: number;
  counterPadding: number;
  verticalPadding: number;
  selected: boolean;
  selectedBorderColor: Color;
}>`
  flex-direction: row;
  border-radius: 4px;
  padding-left: ${({ labelPadding, selected }): number =>
    selected ? labelPadding : labelPadding + 1}px;
  padding-vertical: ${({ verticalPadding, selected }): number =>
    selected ? verticalPadding - 1 : verticalPadding}px;
  background-color: ${({ color }): string => color.string()};
  border-width: ${({ selected }): number => (selected ? 1 : 0)}px;
  border-color: ${({ selectedBorderColor }): string => selectedBorderColor.string()};
  overflow: hidden;
`;

const CountContainer = styled(View)<{
  labelPadding: number;
  counterPadding: number;
  verticalPadding: number;
  selected: boolean;
}>`
  justify-content: center;
  margin-vertical: -${({ verticalPadding }): number => verticalPadding}px;
  margin-left: ${({ labelPadding }): number => labelPadding}px;
  padding-left: ${({ counterPadding }): number => counterPadding}px;
  padding-right: ${({ counterPadding, selected }): number =>
    selected ? counterPadding : counterPadding + 1}px;
  background-color: ${Colors.BLACK.fade(0.75).toString()};
`;

export { FilterButton };
