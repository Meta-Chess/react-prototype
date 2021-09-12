import React from "react";
import { View } from "react-native";
import { SFC, Text } from "primitives";
import { LabelWithDetails } from "ui";
import { Update as UpdateType, updateLabelInfo } from "./UpdateTypes";

interface Props {
  update: UpdateType;
}

export const Update: SFC<Props> = ({ update, style }) => {
  return (
    <View style={[style, { flexDirection: "row" }]}>
      <LabelWithDetails
        label={update.label}
        details={undefined}
        key={1}
        color={updateLabelInfo[update.label].color}
        style={{ alignSelf: "flex-start", width: 70 }}
        textCat={"BodyXS"}
      />
      <Text cat="BodyXS" style={{ paddingLeft: 8 }}>
        {update.description}
      </Text>
    </View>
  );
};
