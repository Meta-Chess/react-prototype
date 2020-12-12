import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { FutureVariant } from "game";
import { VariantTileInfo } from "./VariantTileInfo";
import { VariantTileImage } from "./VariantTileImage";
import { Styles } from "primitives/Styles";
import { AbsoluteView } from "ui";
import Color from "color";

interface Props {
  variant: FutureVariant;
  selected: boolean;
  clash: boolean;
  onPress: () => void;
}

export const VariantTile: SFC<Props> = ({ style, variant, selected, clash, onPress }) => {
  const color = !selected ? Colors.DARKISH : clash ? Colors.ERROR : Colors.SUCCESS;

  return (
    <TouchableContainer style={style} onPress={onPress} activeOpacity={1} color={color}>
      <TitleText
        cat="DisplayXS"
        weight="heavy"
        color={Colors.TEXT.LIGHT.toString()}
        numberOfLines={1}
      >
        {variant.title}
      </TitleText>

      <VariantTileBody>
        <VariantTileInfo variant={variant} style={{ flex: 1 }} />
        <VariantTileImage
          variant={variant}
          style={{ width: 120, height: 120, margin: 8 }}
        />
      </VariantTileBody>
      {!variant.implemented && <CoverView />}
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)<{ color: Color }>`
  background: ${({ color }): string => color.toString()};
  width: 300px;
  ${Styles.BOX_SHADOW_STRONG}
`;

const CoverView = styled(AbsoluteView)`
  background-color: ${Colors.BLACK.fade(0.25).toString()};
`;

const VariantTileBody = styled(View)`
  flex-direction: row;
  background-color: ${Colors.DARK.toString()};
`;

const TitleText = styled(Text)`
  padding-horizontal: 8;
  padding-vertical: 4;
  height: 30;
  text-align: center;
`;
