import React, { ReactNode, useRef } from "react";
import { View, ViewStyle } from "react-native";
import Tippy from "@tippyjs/react";
import { Colors, StyleProps, Text } from "primitives";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";

interface Props {
  content?: string | ReactNode;
  maxWidth?: number;
  children?: ReactNode;
  style?: StyleProps<ViewStyle>;
}

export function Tooltip({
  content,
  maxWidth,
  children,
  style,
}: Props): React.ReactElement {
  const tooltipTargetRef = useRef<View>(null);

  return (
    <StyledTippy
      disabled={!content}
      content={
        typeof content === "string" ? (
          <View>
            <Text
              cat={"BodyXS"}
              color={Colors.WHITE.toString()}
              style={{ textAlign: "center" }}
            >
              {content}
            </Text>
          </View>
        ) : (
          content
        )
      }
      maxWidth={maxWidth ?? "none"}
      appendTo={document.body}
      zIndex={1000}
    >
      <View style={style} ref={tooltipTargetRef}>
        {children}
      </View>
    </StyledTippy>
  );
}

const StyledTippy = styled(Tippy)`
  background-color: ${Colors.DARKISH.toString()};

  .tippy-arrow {
    color: ${Colors.DARKISH.toString()};
  }

  .tippy-content {
    padding: 8px;
  }
`;
