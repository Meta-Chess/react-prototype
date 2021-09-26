/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

export function useCalculatedDimensions(
  ref: React.MutableRefObject<any>,
  wait = 1
): [width: number, height: number] {
  const [dimensions, setDimensions] = useState<[number, number]>();

  const calculateDimensions: () => [number, number] = useCallback(
    () =>
      hasDimensions(ref) ? [ref.current.clientWidth, ref.current.clientHeight] : [0, 0],
    [ref.current]
  );

  const handleResize = useCallback(
    debounce((): void => setDimensions(calculateDimensions()), wait),
    [calculateDimensions]
  );

  useEffect(handleResize, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions || [0, 0];
}

type RefWithDimensions = React.MutableRefObject<{
  clientWidth: number;
  clientHeight: number;
}>;

function hasDimensions(ref: React.MutableRefObject<any>): ref is RefWithDimensions {
  return ref.current?.clientWidth !== undefined && ref.current.clientHeight !== undefined;
}
