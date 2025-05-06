import React, { FC } from "react";
import { ScrollView } from "react-native";
import { ArrowBackWithStemIcon } from "primitives";
import { View } from "react-native";
import { IconButton } from "ui/Buttons/IconButton";
import { useGoBackOrToMainScreen } from "navigation";
import { InfoSectionComponents, InfoSection } from "./InfoSection";
import { Colors } from "primitives";
import styled from "styled-components/native";

interface Props {
  sections?: InfoSection[];
}

export const AboutScreen: FC<Props> = ({ sections = ["mchess"] }) => {
  const goBackOrToMainScreen = useGoBackOrToMainScreen();

  return (
    <>
      <View
        style={{
          width: "100%",
          minWidth: 400,
          padding: 24,
          alignItems: "center",
        }}
      >
        <ScrollView
          style={{ marginTop: 48 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            maxWidth: 800,
            paddingBottom: 40,
          }}
        >
          {sections.map((section, index) => (
            <React.Fragment key={index}>
              {InfoSectionComponents[section]}
              {index < sections.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
      <View style={{ position: "absolute", top: 16, left: 16 }}>
        <IconButton Icon={ArrowBackWithStemIcon} onPress={goBackOrToMainScreen} />
      </View>
    </>
  );
};

const Divider = styled(View)`
  border-color: ${Colors.MCHESS_ORANGE.fade(0.9).toString()};
  border-width: 1px;
  margin-vertical: 24px;
`;
