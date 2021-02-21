import React, { createContext, FC, useContext, useState } from "react";
import { randomChoice } from "utilities";

const defaultUser = {
  name: randomChoice(["Emmanuel", "Gus", "Angus", "Seb"]),
  winCount: 0,
  drawCount: 0,
  lossCount: 0,
};

export type User = typeof defaultUser;

const defaultUserContext = {
  user: defaultUser,
  setName: (_name: string): void => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  incrementWins: (): void => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  incrementDraws: (): void => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  incrementLosses: (): void => {}, // eslint-disable-line @typescript-eslint/no-empty-function
};

const UserContext = createContext(defaultUserContext);

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  const setName = (name: string): void => setUser({ ...user, name });
  const incrementWins = (): void => setUser({ ...user, winCount: user.winCount + 1 });
  const incrementLosses = (): void => setUser({ ...user, lossCount: user.lossCount + 1 });
  const incrementDraws = (): void => setUser({ ...user, drawCount: user.drawCount + 1 });

  return (
    <UserContext.Provider
      value={{ user, setName, incrementWins, incrementDraws, incrementLosses }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): typeof defaultUserContext {
  return useContext(UserContext);
}
