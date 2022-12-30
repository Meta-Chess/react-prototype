import { useCallback, useContext, useEffect, useState } from "react";
import { GameContext } from "components/shared";

export const use3dCylinderRotation = (): {
  rankOffset: number;
  fileOffset: number;
  verticalRotationAllowed: boolean;
  horizontalRotationAllowed: boolean;
} => {
  const { gameMaster } = useContext(GameContext);
  const horizontalRotationAllowed = !!gameMaster?.getRuleNames().includes("cylindrical");
  const verticalRotationAllowed = !!gameMaster
    ?.getRuleNames()
    .includes("verticallyCylindrical");

  const [rankOffset, setRankOffset] = useState(0);
  const [fileOffset, setFileOffset] = useState(0);

  const onKeyDownEvent = useCallback((event) => {
    switch (event.key) {
      case "w":
      case "W":
        if (verticalRotationAllowed) setRankOffset((x) => x + 1);
        break;
      case "a":
      case "A":
        if (horizontalRotationAllowed) setFileOffset((x) => x - 1);
        break;
      case "s":
      case "S":
        if (verticalRotationAllowed) setRankOffset((x) => x - 1);
        break;
      case "d":
      case "D":
        if (horizontalRotationAllowed) setFileOffset((x) => x + 1);
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownEvent, false);
    return (): void => {
      document.removeEventListener("keydown", onKeyDownEvent, false);
    };
  }, []);

  return {
    rankOffset,
    fileOffset,
    verticalRotationAllowed,
    horizontalRotationAllowed,
  };
};
