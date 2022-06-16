import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { User } from "../types/user";

const AuthContext = createContext<{ token?: string; user?: User }>({});

function AuthProvider(props: any) {
  const [user, setUser] = useState<User>({});

  const token = window.location.hash
    ?.substring(1)
    ?.split("&")
    ?.find((elem) => elem.startsWith("access_token"))
    ?.split("=")[1] as string;

  const getUserData = useCallback(async () => {
    let userData = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(userData.data);
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <AuthContext.Provider value={{ token, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
