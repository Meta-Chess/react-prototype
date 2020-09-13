import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "primitives";
import { Button } from "ui";
import { Card } from "ui/Card";
import { useNavigation } from "navigation";
import { VariantInfoCard } from "./VariantInfoCard";
import { RulesInfoCard } from "components/RootStackNavigator/GameScreen/Sidebar/RulesInfoCard";

const Sidebar: FC = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, paddingHorizontal: 60, justifyContent: "center" }}>
      <VariantInfoCard />
      <RulesInfoCard />
      <Card>
        <Text cat="BodyL">Thanks for playing with MChess!</Text>
      </Card>
      <Button text="Finish Game" onPress={navigation.goBack} style={{ margin: 32 }} />
    </View>
  );
};
export { Sidebar };
