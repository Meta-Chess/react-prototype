import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { FutureVariant } from "game";
import { GearButton } from "./GearButton";
import { StarIcon } from "primitives/icons";
import { TextIcon } from "ui";

interface Props {
  variant: FutureVariant;
  hovered: boolean;
  showGear?: boolean;
  showStar?: boolean;
  onGearPress?: () => void;
}

export const VariantTileHeader: SFC<Props> = ({
  variant,
  hovered,
  showGear: _showGear = hovered,
  showStar = hovered,
  style,
  onGearPress,
}) => {
  const showGear = _showGear && onGearPress;
  return (
    <Container style={style}>
      <GearContainer>{showGear && <GearButton onPress={onGearPress} />}</GearContainer>
      <TitleText
        cat="BodyM"
        weight="normal"
        color={Colors.TEXT.LIGHT.toString()}
        numberOfLines={1}
        selectable={false}
      >
        {variant.shortTitle ?? variant.title}
      </TitleText>
      <ComplexityContainer>
        {showStar && (
          <>
            <TextIcon Icon={StarIcon} style={{ marginTop: -1 }} />
            <Text
              cat="BodyS"
              weight="heavy"
              alignment="center"
              color={Colors.TEXT.LIGHT_SECONDARY.toString()}
              selectable={false}
            >
              {variant.complexity}
            </Text>
          </>
        )}
      </ComplexityContainer>
    </Container>
  );
};

const Container = styled(View)`
  justify-content: center;
  flex-direction: row;
  height: 15%;
  width: 100%;
`;

const GearContainer = styled(View)`
  margin-left: 0px;
  margin-top: -4px;
  margin-right: auto;
`;

const ComplexityContainer = styled(View)`
  margin-right: 0px;
  margin-top: -7px;
  margin-left: auto;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled(Text)`
  position: absolute;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
