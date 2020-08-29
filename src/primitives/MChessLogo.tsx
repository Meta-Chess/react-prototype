import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC } from "./SFC";
import { Text } from "./Text";
import { Colors } from "./Colors";

interface Props {
  scaleFactor: number;
}

export const MChessLogo: SFC<Props> = ({ scaleFactor = 1, style }) => {
  return (
    <View
      style={[
        style,
        {
          width: scaleFactor * 300,
          height: scaleFactor * 300,
        },
      ]}
    >
      <CenteredContainer style={{ height: scaleFactor * 300, width: scaleFactor * 300 }}>
        <Text
          size={scaleFactor * 300}
          color={Colors.MCHESS.toString()}
          style={{ fontWeight: "700" }}
        >
          M
        </Text>
      </CenteredContainer>
      <CenteredContainer style={{ height: scaleFactor * 300, width: scaleFactor * 300 }}>
        <View style={{ paddingTop: scaleFactor * 50 }}>
          <Text
            size={scaleFactor * 100}
            color={Colors.TEXT.LIGHT.toString()}
            style={{
              textShadowColor: Colors.SHADOW.fade(0.5).toString(),
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
