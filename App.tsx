import React, { useState, createContext } from "react";
import { GameScreen, StartScreen } from "./src/components";

export const BigBoolContext = createContext({
  setBigBool: (bigBool: boolean): void => {},
});

export default function App() {
  const [bigBool, setBigBool] = useState(false); // TODO: PURGE!

  return (
    <BigBoolContext.Provider value={{ setBigBool }}>
      {bigBool ? <GameScreen /> : <StartScreen />}
    </BigBoolContext.Provider>
  );
}
