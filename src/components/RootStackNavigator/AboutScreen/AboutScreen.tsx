import React, { FC } from "react";
import { ScrollView } from "react-native";
import { HelpMenu, ScreenContainer } from "components/shared";
import { ArrowBackWithStemIcon } from "primitives";
import { View } from "react-native";
import { IconButton } from "ui/Buttons/IconButton";
import { useGoBackOrToStartScreen } from "navigation";
import { InfoSectionComponents } from "./InfoSection";
import { useRoute } from "navigation";
import { Screens } from "navigation/Screens";
import { Colors } from "primitives";
import styled from "styled-components/native";

export const AboutScreen: FC = () => {
  const goBackOrToStartScreen = useGoBackOrToStartScreen();
  const params = { ...useRoute<Screens.AboutScreen>().params };
  const sections = params.sections || ["mchess"];

  return (
    <ScreenContainer style={{ alignItems: "center", paddingVertical: 0 }}>
      <ScrollView
        style={{ marginTop: 48 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ maxWidth: 800, paddingBottom: 40 }}
      >
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            {InfoSectionComponents[section]}
            {index < sections.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </ScrollView>
      <View style={{ position: "absolute", top: 16, left: 16 }}>
        <IconButton Icon={ArrowBackWithStemIcon} onPress={goBackOrToStartScreen} />
      </View>
    </ScreenContainer>
  );
};

const Divider = styled(View)`
  border-color: ${Colors.MCHESS_ORANGE.fade(0.9).toString()};
  border-width: 1px;
  margin-vertical: 24px;
`;
