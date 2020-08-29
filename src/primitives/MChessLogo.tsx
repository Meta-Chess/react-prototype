import React, { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Text } from "./Text";
import { Colors } from "./Colors";

export const MChessLogo: FC = () => {
  return (
    <View style={{ width: 300, height: 300 }}>
      <CenteredContainer>
        <Text size={300} color={Colors.MCHESS.toString()} style={{ fontWeight: "700" }}>
          M
        </Text>
      </CenteredContainer>
      <CenteredContainer>
        <View style={{ paddingTop: 50 }}>
          <Text
            size={100}
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
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
`;
