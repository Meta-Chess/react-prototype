import React from "react";
import { SFC, Colors } from "primitives";
import { ButtonLight, ButtonSecondaryLight, Card, Footer } from "ui";
import { Styles } from "primitives/Styles";
import styled from "styled-components/native";

interface Props {
  title: string;
  reset: () => void;
  done: () => void;
}

export const ModalTemplate: SFC<Props> = ({ title, reset, done, children, style }) => {
  return (
    <ModalCard style={style} title={title}>
      <Footer style={{ padding: 0 }} />
      {children}
      <Footer>
        <ButtonSecondaryLight label={"Reset"} style={{ flex: 1 }} onPress={reset} />
        <ButtonLight label={"Done"} style={{ flex: 1, marginLeft: 8 }} onPress={done} />
      </Footer>
    </ModalCard>
  );
};

const ModalCard = styled(Card)`
  ${Styles.BOX_SHADOW_STRONG}
  background-color: ${Colors.DARKER.toString()};
  max-height: 400px;
`;
