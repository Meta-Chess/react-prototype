import { useState, useRef, useEffect } from "react";
import { Platform } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useHover(): [React.MutableRefObject<any>, boolean] {
  const [value, setValue] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref: any = useRef(null);

  const handleMouseOver = (): void => setValue(true);
  const handleMouseOut = (): void => setValue(false);

  useEffect((): void | (() => void) => {
    const node = ref.current;
    if (node && Platform.OS === "web") {
      node.addEventListener("mouseenter", handleMouseOver);
      node.addEventListener("mouseleave", handleMouseOut);

      return (): void => {
        node.removeEventListener("mouseenter", handleMouseOver);
        node.removeEventListener("mouseleave", handleMouseOut);
      };
    }
  }, []);

  return [ref, value];
}
