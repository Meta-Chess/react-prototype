import React, { ReactNode } from "react";
import { Colors, MChessLogo, Text } from "primitives";
import { View } from "react-native";

interface Props {
  fallback?: ReactNode;
}

interface State {
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  // TODO: implement `componentDidCatch(error, errorInfo)` for logging / monitoring

  render(): ReactNode {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <MChessLogo size={180} />
            <Text cat={"DisplayM"} style={{ marginTop: 24 }}>
              {"Something went wrong"}
            </Text>
            <Text
              cat={"DisplayS"}
              color={Colors.TEXT.LIGHT_SECONDARY.toString()}
              style={{ marginTop: 8 }}
            >
              {"Try reloading?"}
            </Text>
          </View>
        )
      );
    }

    return this.props.children;
  }
}
