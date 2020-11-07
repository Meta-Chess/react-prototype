import React from "react";
import { Platform, View } from "react-native";
import styled from "styled-components/native";
import { SFC } from "./SFC";
import { Text } from "./Text";
import { Colors } from "./Colors";

export const MChessLogo: SFC = ({ style }) => {
  const scaleFactor = Platform.OS === "web" ? 0.8 : 0.7;
  return (
    <View
      style={[
        style,
        {
          width: scaleFactor * 300,
          height: scaleFactor * (Platform.OS === "web" ? 300 : 240),
        },
      ]}
    >
      <CenteredContainer style={{ height: scaleFactor * 300, width: scaleFactor * 300 }}>
        <Text
          size={scaleFactor * 300}
          lineHeight={scaleFactor * 300}
          color={Colors.MCHESS.toString()}
          selectable={false}
          style={{ fontWeight: "700" }}
        >
          M
        </Text>
      </CenteredContainer>
      <CenteredContainer style={{ height: scaleFactor * 300, width: scaleFactor * 300 }}>
        <View style={{ paddingTop: scaleFactor * 50 }}>
          <Text
            size={scaleFactor * 100}
            lineHeight={scaleFactor * 100}
            color={Colors.EMPHATIC.LIGHT.toString()}
            selectable={false}
            style={{
              textShadowColor: Colors.BLACK.fade(0.5).toString(),
              textShadowRadius: 5,
            }}
          >
            Chess
          </Text>
        </View>
      </CenteredContainer>
    </View>
  );
};

const CenteredContainer = styled(View)`
  position: absolute;
  justify-content: center;
  align-items: center;
`;
