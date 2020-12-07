import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { FutureVariant } from "game";
import { VariantTileInfo } from "./VariantTileInfo";
import { VariantTileImage } from "./VariantTileImage";

interface Props {
  variant: FutureVariant;
  selected: boolean;
  clash: boolean;
  onPress: () => void;
}

export const VariantTile: SFC<Props> = ({ style, variant, selected, clash, onPress }) => {
  const selectColor: string = clash ? Colors.ERROR.toString() : Colors.SUCCESS.toString();
  const tileHeight = "166px";
  const tileWidth = "300px";

  return (
    <OuterContainer
      style={style}
      selected={selected}
      selectColor={selectColor}
      tileHeight={tileHeight}
      tileWidth={tileWidth}
    >
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "column" }}
        onPress={onPress}
        activeOpacity={1}
      >
        <TitleText
          cat="DisplayXS"
          weight="heavy"
          color={Colors.TEXT.LIGHT.toString()}
          numberOfLines={1}
        >
          {variant.title}
        </TitleText>

        <VariantTileBody>
          <VariantTileInfo
            variant={variant}
            style={{ flex: 1, marginHorizontal: "12px", marginVertical: "8px" }}
          />
          <VariantTileImage
            variant={variant}
            style={{ width: 120, height: 120, margin: "8px" }}
          />
        </VariantTileBody>
      </TouchableOpacity>
      {!variant.implemented && (
        <CoverView style={style} tileHeight={tileHeight} tileWidth={tileWidth} />
      )}
    </OuterContainer>
  );
};

interface OuterContainerProps {
  selected: boolean;
  selectColor: string;
  tileHeight: string;
  tileWidth: string;
}

const OuterContainer = styled(View)<OuterContainerProps>`
  color: black;
  margin: 4px;
  background: ${({ selected, selectColor }): string =>
    selected ? selectColor : Colors.DARKISH.toString()};
  flex-direction: row;
  height: ${({ tileHeight }): string => tileHeight};
  width: ${({ tileWidth }): string => tileWidth};
  shadow-color: ${Colors.BLACK.toString()};
  shadow-radius: 4px;
  box-shadow: 0px 2px 4px;
`;

interface CoverViewProps {
  tileHeight: string;
  tileWidth: string;
}

const CoverView = styled(View)<CoverViewProps>`
  position: absolute;
  background-color: ${Colors.BLACK.fade(0.25).toString()};
  height: ${({ tileHeight }): string => tileHeight};
  width: ${({ tileWidth }): string => tileWidth};
`;

const VariantTileBody = styled(View)`
  flex-direction: row;
  background-color: ${Colors.DARK.toString()};
  height: 136;
`;

const TitleText = styled(Text)`
  margin-horizontal: 8;
  padding-vertical: 4;
  height: 30;
  text-align: center;
`;
