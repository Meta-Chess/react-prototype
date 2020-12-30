import React, { ReactNode, useCallback, useState } from "react";
import { ViewStyle, View } from "react-native";
import { SFC, StyleProps } from "primitives";
import styled from "styled-components/native";
import { Row } from "ui";

interface Props {
  a: (props: { style: StyleProps<ViewStyle> }) => ReactNode;
  b: (props: { style: StyleProps<ViewStyle> }) => ReactNode;
  c: (props: { style: StyleProps<ViewStyle> }) => ReactNode;
}

const ControlLayoutContainer: SFC<Props> = ({ a, b, c, style }) => {
  const [width, setWidth] = useState(0);
  const handleDimensions = useCallback(
    (event) => {
      const { width: newWidth } = event.nativeEvent.layout;
      if (width !== newWidth) setWidth(newWidth);
    },
    [width]
  );
  return (
    <View onLayout={handleDimensions} style={style}>
      {width < 780 ? (
        <NarrowOptionContainer>
          {a({ style: {} })}
          <Row style={{ marginTop: 24, width: "100%", justifyContent: "space-around" }}>
            {b({ style: { marginHorizontal: 4, flex: 1, maxWidth: 250, minWidth: 160 } })}
            {c({ style: { marginHorizontal: 4, flex: 1, maxWidth: 250, minWidth: 160 } })}
          </Row>
        </NarrowOptionContainer>
      ) : (
        <WideOptionContainer style={{ marginTop: 8 }}>
          <View style={{ flex: 2 }} />
          {b({ style: { marginHorizontal: 32, flex: 5, maxWidth: 200, minWidth: 200 } })}
          <View style={{ flex: 1 }} />
          {a({ style: {} })}
          <View style={{ flex: 1 }} />
          {c({ style: { marginHorizontal: 32, flex: 5, maxWidth: 200, minWidth: 200 } })}
          <View style={{ flex: 2 }} />
        </WideOptionContainer>
      )}
    </View>
  );
};

const NarrowOptionContainer = styled(View)`
  align-items: center;
`;

const WideOptionContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

export { ControlLayoutContainer };
