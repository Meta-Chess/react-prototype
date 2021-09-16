import React from "react";
import { View } from "react-native";
import { SFC, Colors, Text } from "primitives";
import { Divider } from "ui";
import { UpdateGroup as UpdateGroupType } from "./UpdateTypes";
import { getDateString } from "utilities";
import { Update } from "./Update";

interface Props {
  updateGroup: UpdateGroupType;
  divider: boolean;
}

export const UpdateGroup: SFC<Props> = ({ updateGroup, divider = true, style }) => {
  return (
    <>
      {divider && <Divider style={{ padding: 0 }} />}
      <View style={[style, { flexDirection: "column", padding: 16 }]}>
        <Text
          cat="BodyXS"
          style={{ paddingBottom: 16 }}
          color={Colors.TEXT.LIGHT_SECONDARY.toString()}
        >
          {getDateString(updateGroup.date)}
        </Text>
        {updateGroup.updates.map((update, i) => {
          return (
            <Update
              style={{ paddingBottom: i !== updateGroup.updates.length - 1 ? 12 : 4 }}
              key={i}
              update={update}
            />
          );
        })}
      </View>
    </>
  );
};
