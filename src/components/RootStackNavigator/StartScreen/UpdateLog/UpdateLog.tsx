import React from "react";
import { ScrollView, View } from "react-native";
import { Colors, SFC } from "primitives";
import { AbsoluteView, Card, Divider, JoinDiscordButton } from "ui";
import { ButtonSecondary } from "ui/Buttons";
import { UpdateGroup } from "./UpdateGroup";
import type { UpdateGroup as UpdateGroupType } from "./UpdateTypes";

interface Props {
  updates: UpdateGroupType[];
  onDismiss: () => void;
  windowHeight: number;
}

export const UpdateLog: SFC<Props> = ({ updates, onDismiss, windowHeight, style }) => {
  return (
    <AbsoluteView
      style={{
        backgroundColor: Colors.BLACK.fade(0.2).toString(),
        padding: 16,
      }}
    >
      <Card
        style={[
          style,
          {
            maxHeight: windowHeight * 0.8,
            flexDirection: "column",
          },
        ]}
        title={"Recent Updates"}
      >
        <Divider style={{ padding: 0 }} />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {updates.length ? (
            updates.map((updateGroup, i) => {
              return <UpdateGroup key={i} updateGroup={updateGroup} divider={i !== 0} />;
            })
          ) : (
            <NoUpdates />
          )}
        </ScrollView>
        <Divider>
          <ButtonSecondary label={"Done"} style={{ flex: 1 }} onPress={onDismiss} />
        </Divider>
      </Card>
    </AbsoluteView>
  );
};

const NoUpdates: SFC = ({ style }) => {
  return (
    <View style={[style, { flexDirection: "row", padding: 16 }]}>
      <JoinDiscordButton
        buttonText={
          "There are currently no recent game updates.\nClick through to the Community Discord for status updates."
        }
      />
    </View>
  );
};
