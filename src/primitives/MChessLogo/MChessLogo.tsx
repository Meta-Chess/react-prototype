import React from "react";
import { Platform, View, Image } from "react-native";
import styled from "styled-components/native";
import { SFC } from "../SFC";
import MChessLogoPNG from "./MChessLogo.png";
import { Text } from "../Text";
import { Colors } from "../Colors";
import { BlackCircle } from "primitives/images";
import { AbsoluteView } from "ui";

export const MChessLogo: SFC = ({ style }) => {
  const size = Platform.OS === "web" ? 240 : 210;
  return (
    <Image style={{ width: size, height: size }} source={MChessLogoPNG} />
    // <View
    //   style={[
    //     style,
    //     {
    //       width: scaleFactor * 300,
    //       height: scaleFactor * (Platform.OS === "web" ? 300 : 240),
    //     },
    //   ]}
    // >
    //   <CenteredContainer style={{ height: scaleFactor * 300, width: scaleFactor * 300 }}>
    //     <Text
    //       size={scaleFactor * 300}
    //       lineHeight={scaleFactor * 300}
    //       color={Colors.MCHESS_ORANGE.toString()}
    //       selectable={false}
    //       style={{ fontWeight: "700" }}
    //     >
    //       M
    //     </Text>
    //   </CenteredContainer>
    //   <CenteredContainer style={{ height: scaleFactor * 300, width: scaleFactor * 300 }}>
    //     <View style={{ paddingTop: scaleFactor * 50 }}>
    //       <Text
    //         size={scaleFactor * 100}
    //         lineHeight={scaleFactor * 100}
    //         color={Colors.EMPHATIC.LIGHT.toString()}
    //         selectable={false}
    //         style={{
    //           textShadowColor: Colors.BLACK.fade(0.5).toString(),
    //           textShadowRadius: 5,
    //         }}
    //       >
    //         Chess
    //       </Text>
    //     </View>
    //   </CenteredContainer>
    // </View>
  );
};

// const CenteredContainer = styled(View)`
//   position: absolute;
//   justify-content: center;
//   align-items: center;
// `;
