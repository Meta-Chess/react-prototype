import React from "react";
import { View } from "react-native";
import { SFC, Colors, Text } from "primitives";
import { Footer } from "ui";
import { UpdateGroup as UpdateGroupType } from "./UpdateTypes";
import { getDateString } from "utilities";
import { Update } from "./Update";

interface Props {
  updateGroup: UpdateGroupType;
  footer: boolean;
}

export const UpdateGroup: SFC<Props> = ({ updateGroup, footer = true, style }) => {
  return (
    <>
      {footer && <Footer style={{ padding: 0 }} />}
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
