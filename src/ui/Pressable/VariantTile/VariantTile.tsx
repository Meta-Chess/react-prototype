import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { FutureVariant } from "game";
import { VariantTileHeader } from "./VariantTileHeader";
import { VariantTileInfo } from "./VariantTileInfo";
import { VariantTileImage } from "./VariantTileImage";
import { Styles } from "primitives/Styles";
import { AbsoluteView } from "ui";

interface Props {
  variant: FutureVariant;
  selected: boolean;
  clash: boolean;
  onPress: () => void;
}

export const VariantTile: SFC<Props> = ({ style, variant, selected, clash, onPress }) => {
  const implemented = variant.implemented;
  return (
    <TouchableContainer
      style={style}
      onPress={onPress}
      activeOpacity={1}
      disabled={!implemented}
    >
      <VariantTileHeader variant={variant} selected={selected} clash={clash} />
      <VariantTileBody>
        <VariantTileInfo variant={variant} style={{ flex: 1 }} />
        <VariantTileImage
          variant={variant}
          style={{ width: 120, height: 120, margin: 8 }}
        />
      </VariantTileBody>
      {!implemented && <CoverView />}
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)`
  width: 300px;
  background: transparent;
  ${Styles.BOX_SHADOW_STRONG}
  border-radius: 4px;
  overflow: hidden;
`;

const VariantTileBody = styled(View)`
  flex-direction: row;
  background-color: ${Colors.DARK.toString()};
`;

const CoverView = styled(AbsoluteView)`
  background-color: ${Colors.BLACK.fade(0.25).toString()};
`;
