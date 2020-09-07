import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";

interface Props {
  color: string;
}

const CheckBoxEmpty: FC<Props> = ({ color }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        fill={color}
      />
    </Svg>
  );
};

export { CheckBoxEmpty };
