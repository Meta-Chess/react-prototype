import { useContext, useEffect, useRef, useCallback } from "react";
import { BoardMeasurements, GameContext } from "components/shared";

// TODO: There may be some bad ref/hook practice here...
export const useCircularRotation = (
  measurements: BoardMeasurements,
  radialOffset: number,
  setRadialOffset: (x: number) => void,
  circularOffset: number,
  setCircularOffset: (x: number) => void,
  numberOfFiles: number,
  numberOfRanks: number
): {
  radialRotationAllowed: boolean;
  circularRotationAllowed: boolean;
} => {
  const { gameMaster } = useContext(GameContext);

  //TODO: these should be memos?
  const circularRotationAllowed = !!gameMaster
    ?.getRuleNames()
    .includes("verticallyCylindrical");
  const radialRotationAllowed = !!gameMaster?.getRuleNames().includes("cylindrical");

  const radialOffsetRef = useRef(radialOffset);
  const circularOffsetRef = useRef(circularOffset);

  const radialOffsetInwards = (): void => {
    if (radialRotationAllowed) {
      radialOffsetRef.current = (radialOffsetRef.current - 1) % numberOfFiles;
      gameMaster?.render();
    }
  };
  const radialOffsetOutwards = (): void => {
    if (radialRotationAllowed) {
      radialOffsetRef.current = (radialOffsetRef.current + 1) % numberOfFiles;
      gameMaster?.render();
    }
  };
  const circularOffsetClockwise = (): void => {
    if (circularRotationAllowed) {
      circularOffsetRef.current = (circularOffsetRef.current + 1) % numberOfRanks;
      gameMaster?.render();
    }
  };
  const circularOffsetAnticlockwise = (): void => {
    if (circularRotationAllowed) {
      circularOffsetRef.current = (circularOffsetRef.current - 1) % numberOfRanks;
      gameMaster?.render();
    }
  };

  //TODO: extract from here and useCylindricalRotation
  const onKeypressEvent = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "d":
      case "D":
        radialOffsetInwards();
        break;
      case "w":
      case "W":
        circularOffsetAnticlockwise();
        break;
      case "a":
      case "A":
        radialOffsetOutwards();
        break;
      case "s":
      case "S":
        circularOffsetClockwise();
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keypress", onKeypressEvent, false);
    return (): void => {
      document.removeEventListener("keypress", onKeypressEvent, false);
    };
  }, []);

  useEffect(() => {
    setRadialOffset(radialOffsetRef.current);
  }, [radialOffsetRef.current]);

  useEffect(() => {
    setCircularOffset(circularOffsetRef.current);
  }, [circularOffsetRef.current]);

  return {
    radialRotationAllowed,
    circularRotationAllowed,
  };
};
