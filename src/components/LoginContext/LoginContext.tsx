import React, { createContext, FC, ReactNode, useState } from "react";
import { User } from "./User";

interface LoginInformation {
  user?: User;
  loading?: boolean;
  error?: boolean;
  token?: string;
}

export interface LoginSetters {
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setToken: (token: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultSetMethod = (_: any): void => {
  throw new Error("method not specified");
};

export const LoginContext = createContext<LoginInformation & LoginSetters>({
  setUser: defaultSetMethod,
  setLoading: defaultSetMethod,
  setError: defaultSetMethod,
  setToken: defaultSetMethod,
});

export const LoginProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState<string>();

  return (
    <LoginContext.Provider
      value={{ user, setUser, loading, setLoading, error, setError, token, setToken }}
    >
      {children}
    </LoginContext.Provider>
  );
};
