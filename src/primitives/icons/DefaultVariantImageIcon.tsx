import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";
import { Colors } from "primitives/Colors";

interface Props {
  size?: number;
}

// modified Book SVG Vector CC from Luka Marr (https://www.svgrepo.com/svg/522469/book)
export const DefaultVariantImageIcon: FC<Props> = ({ size = 24 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 24" translate={[2, -6]}>
      <Path
        d="M19.2353 6H21.5C21.7761 6 22 6.22386 22 6.5V19.539C22 19.9436 21.5233 20.2124 21.1535 20.0481C20.3584 19.6948 19.0315 19.2632 17.2941 19.2632C14.3529 19.2632 12 21 12 21C12 21 9.64706 19.2632 6.70588 19.2632C4.96845 19.2632 3.64156 19.6948 2.84647 20.0481C2.47668 20.2124 2 19.9436 2 19.539V6.5C2 6.22386 2.22386 6 2.5 6H4.76471"
        fill={Colors.LIGHTISH.toString()}
        stroke={Colors.LIGHTISH.toString()}
        strokeLinejoin="round"
        translate={[0, 2]}
      />
      <Path
        d="M12 6.90909C10.8999 5.50893 9.20406 4.10877 5.00119 4.00602C4.72513 3.99928 4.5 4.22351 4.5 4.49965C4.5 6.54813 4.5 14.3034 4.5 16.597C4.5 16.8731 4.72515 17.09 5.00114 17.099C9.20405 17.2364 10.8999 19.0998 12 20.5M12 6.90909C13.1001 5.50893 14.7959 4.10877 18.9988 4.00602C19.2749 3.99928 19.5 4.21847 19.5 4.49461C19.5 6.78447 19.5 14.3064 19.5 16.5963C19.5 16.8724 19.2749 17.09 18.9989 17.099C14.796 17.2364 13.1001 19.0998 12 20.5M12 6.90909L12 20.5"
        fill={Colors.LIGHTEST.toString()}
        stroke={Colors.LIGHTEST.toString()}
        strokeLinejoin="round"
        translate={[0, 2]}
      />
      <Path
        d="M12 5.8 V21"
        strokeWidth={0.4}
        stroke={Colors.LIGHTISH.toString()}
        strokeLinecap="butt"
        fill="none"
        translate={[0, 2]}
      />
      <Path
        d="M14 6h-2v3H9v2h3v3h2v-3h3V9h-3z"
        fill={Colors.LIGHTEST.toString()}
        scale={0.5}
        translate={[16, -2]}
      />
    </Svg>
  );
};
