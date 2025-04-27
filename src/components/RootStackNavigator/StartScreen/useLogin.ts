import { useContext, useEffect } from "react";
import { LoginContext, LoginSetters } from "components/LoginContext";
import { Linking } from "react-native";
import axios from "axios";

const DEV_GET_USER_URL =
  process.env.DEV_GET_USER_URL ||
  "https://5yk67fvoqf.execute-api.ap-southeast-2.amazonaws.com/dev/userByCode";

export function useLogin(): void {
  const { setLoading, setError, setToken, setUser } = useContext(LoginContext);

  useEffect(() => {
    setLoading(true);
    setError(false);

    loadUser({ setLoading, setError, setToken, setUser }).catch((error): void => {
      console.log(`Error loading user: ${error}`); // eslint-disable-line no-console
      setError(true);
      setLoading(false);
    });
  }, []);
}

async function loadUser({
  setLoading,
  setError,
  setToken,
  setUser,
}: LoginSetters): Promise<void> {
  const url = await Linking.getInitialURL();
  const token = findToken(url);

  if (!token) {
    console.log("No user token found"); // eslint-disable-line no-console
    setLoading(false);
    setError(false);
    return;
  }
  setToken(token);

  const response = await axios.get(DEV_GET_USER_URL, {
    headers: { Authorization: "Bearer " + token },
  });

  if (response.status !== 200 || !response.data) {
    console.log(`Loading user returned status ${response.status}`); // eslint-disable-line no-console
    setError(true);
  } else {
    setError(false);
  }
  setUser(response?.data?.user);
  setLoading(false);
}

function findToken(url: string | null | undefined): string | undefined {
  const hashOptions = url
    ?.split("#")[1]
    ?.split("&")
    .reduce((acc, fragment) => {
      const parts = fragment.split("=");
      return {
        ...acc,
        [parts[0]]: parts.slice(1).join("="), // restore any '=' accidentally removed by the split above
      };
    }, {}) as { access_token?: string }; // TODO: consider case conversion?
  return hashOptions?.access_token;
}
