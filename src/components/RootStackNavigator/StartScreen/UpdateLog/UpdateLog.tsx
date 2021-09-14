import React from "react";
import { ScrollView } from "react-native";
import { SFC, Colors } from "primitives";
import { Card, Divider, AbsoluteView } from "ui";
import { ButtonSecondary } from "ui/Buttons";
import { UpdateGroup } from "./UpdateGroup";
import { updates } from "./updates";

interface Props {
  setShowUpdateLog: (x: boolean) => void;
  windowHeight: number;
}

export const UpdateLog: SFC<Props> = ({ setShowUpdateLog, windowHeight, style }) => {
  return (
    <AbsoluteView style={{ backgroundColor: Colors.BLACK.fade(0.2).toString() }}>
      <Card
        style={[
          style,
          { height: windowHeight * 0.8, width: 400, flexDirection: "column" },
        ]}
        title={"Recent Updates"}
      >
        <Divider style={{ padding: 0 }} />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {updates.map((updateGroup, i) => {
            return <UpdateGroup key={i} updateGroup={updateGroup} divider={i !== 0} />;
          })}
        </ScrollView>
        <Divider>
          <ButtonSecondary
            label={"Done"}
            style={{ flex: 1 }}
            onPress={(): void => {
              setShowUpdateLog(false);
              return;
            }}
          />
        </Divider>
      </Card>
    </AbsoluteView>
  );
};
