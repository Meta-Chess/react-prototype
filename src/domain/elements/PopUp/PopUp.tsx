import React, { FC } from "react";
import { PopUpEnum } from "./PopUpEnum";
import { Promotion } from "./components";
import styled from "styled-components";
import {View} from "react-native";

interface Props {
  popUp: PopUpEnum;
  meta: object;
}

const PopUp: FC<Props> = ({ popUp, meta }) => {
  return (
    <PopUpContainer>
      {
        {
          [PopUpEnum.Promotion]: <Promotion meta={meta} />,
        }[popUp]
      }
    </PopUpContainer>
  );
};

const PopUpContainer = styled(View)`
  position: absolute;
  left: calc(50% - 216px);
  top: calc(50% - 66px);
  width: 400px;
  height: 100px;
  background: #88888c;
  border-radius: 16px;
  box-shadow: 2px 1px 16px #151515;
  padding: 16px;
`;

export { PopUp };
