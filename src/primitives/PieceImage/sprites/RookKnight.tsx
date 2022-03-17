import React, { FC } from "react";
import { Path } from "react-native-svg";

const RookKnight: FC = () => {
  return (
    <>
      <Path
        d="m34 35.13-3-3H14l-3 3"
        fillOpacity={1}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
        transform="translate(0 -.31)"
      />
      <Path
        fillOpacity={1}
        fillRule="evenodd"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
        d="M11 35.13v5h4v-2h5v2h5v-2h5v2h4v-5"
        transform="translate(0 -.31)"
      />
      <Path
        fillOpacity={1}
        fillRule="evenodd"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
        d="M31.553 32.418v-2.115H13.447v2.115"
        transform="translate(0 -.31)"
      />
      <Path
        fill="none"
        fillOpacity={0.75}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeOpacity={1}
        d="M11 35.13h23"
        transform="translate(0 -.31)"
      />
      <Path
        d="M22.029 36c-10.5-1-16.5-8-16-29h23c0 9-10 6.5-8 21"
        fillOpacity={1}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
        transform="rotate(180 18.603 17.59) scale(.76542)"
      />
      <Path
        d="M20.029 28c-.385-2.911 5.553-7.369 8-9 3-2 2.82-4.343 5-4 1.042.944-1.413 3.038 0 3 1 0-.187-1.232 1-2 1 0 4.003-1 4 4 0 2-6 12-6 12s-1.886 1.902-2 3.5c.726.994.5 2 .5 3-1 1-3-2.5-3-2.5h-2s-.782 1.992-2.5 3c-1 0-1-3-1-3"
        fillOpacity={1}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
        transform="rotate(180 18.603 17.59) scale(.76542)"
      />
      <Path
        transform="translate(3.888 1.503) scale(.76542)"
        d="M9 23.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0z"
        opacity={1}
        fill="#000"
        fillOpacity={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
      />
      <Path
        transform="rotate(30 12.902 18.39) scale(.76542)"
        d="M15 15.5a.5 1.5 0 1 1-1 0 .5 1.5 0 1 1 1 0z"
        opacity={1}
        fill="#000"
        fillOpacity={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
      />
      <Path
        fill="none"
        fillOpacity={0.75}
        fillRule="evenodd"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
        d="M30 30H15"
      />
    </>
  );
};

export { RookKnight };
