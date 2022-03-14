import React, { FC } from "react";
import { Path } from "react-native-svg";

const BishopKnight: FC = () => {
  return (
    <>
      <Path
        fillOpacity={1}
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
        d="M36 36c-3.385-.972-10.115.43-13.5-2-3.385 2.43-10.115 1.028-13.5 2 0 0-1.646.542-3 2 .677.972 1.646.986 3 .5 3.385-.972 10.115.458 13.5-1 3.385 1.458 10.115.028 13.5 1 1.354.486 2.323.472 3-.5-1.354-1.945-3-2-3-2z"
      />
      <Path
        fillOpacity={1}
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
        d="M30 32c-2.5 2.5-12.5 2.5-15 0-.5-1.5 0-2 0-2h15s.5.5 0 2z"
      />
      <Path
        fill="none"
        fillOpacity={0.75}
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
        d="M30 30H15"
      />
      <Path
        d="M22.029 36c-10.5-1-16.5-8-16-29h23c0 9-10 6.5-8 21"
        fillOpacity={1}
        fillRule="evenodd"
        stroke="#000"
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
        stroke="#000"
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
        stroke="#000"
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
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
      />
    </>
  );
};

export { BishopKnight };
