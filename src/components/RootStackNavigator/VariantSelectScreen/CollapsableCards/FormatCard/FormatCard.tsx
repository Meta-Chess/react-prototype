import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { futureVariants } from "game";
import { CollapsableCard } from "ui/Containers";
import { ModalGearButton } from "ui/Pressable";
import { SFC, Text, Colors } from "primitives";
import { FutureVariantName } from "game";
import { FormatName, formats } from "game/formats";
import { FormatIcon } from "components/shared";
import { RuleNamesWithParams } from "game/CompactRules";
import { VariantLabel } from "components/shared/Labels";
import {
  ModalInfo,
  ModalType,
} from "components/RootStackNavigator/VariantSelectScreen/Modals/shared";
import { filterVariantsForBoardType } from "game/variantAndRuleProcessing/boardTypeProcessing";
interface Props {
  selectedFormat: FormatName;
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  modalInfo: ModalInfo;
  setModalInfo: (x: ModalInfo) => void;
  ruleNamesWithParams?: RuleNamesWithParams;
}

const FormatCard: SFC<Props> = ({
  selectedFormat,
  selectedVariants,
  setSelectedVariants,
  modalInfo,
  setModalInfo,
  ruleNamesWithParams = {},
}) => {
  const nonBoardSelectedVariants = filterVariantsForBoardType(
    selectedVariants,
    selectedVariants
  );
  return (
    <CollapsableCard
      title={"Format - " + formats[selectedFormat].title}
      titleComponent={<FormatIcon format={selectedFormat} />}
      endComponent={
        <ModalGearButton
          customModalInfo={{
            type: ModalType.formatModal,
          }}
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
        />
      }
      defaultState={true}
      collapsable={false}
    >
      <Text
        color={Colors.TEXT.LIGHT_SECONDARY.toString()}
        cat="BodyXS"
        style={{ fontStyle: "italic", marginVertical: 6, marginLeft: 8 }}
      >
        {formats[selectedFormat].shortExplanation}
      </Text>
      <Container>
        {nonBoardSelectedVariants.map((variant) => {
          return (
            <VariantLabel
              key={futureVariants[variant].title}
              variant={futureVariants[variant]}
              ruleNamesWithParams={ruleNamesWithParams}
              textCat={"BodyXS"}
              onPress={(): void =>
                selectedVariants.includes(variant)
                  ? setSelectedVariants(selectedVariants.filter((x) => x !== variant))
                  : setSelectedVariants([...selectedVariants, variant])
              }
              style={{
                paddingHorizontal: 4,
                paddingVertical: 2,
                backgroundColor: Colors.DARKISH.toString(),
                borderRadius: 4,
                margin: 4,
              }}
            />
          );
        })}
      </Container>
    </CollapsableCard>
  );
};

const Container = styled(View)`
  flex-flow: row wrap;
`;

export { FormatCard };
