import axios from "axios";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import UsersService from "../services/users.service";
import { User } from "../types/user";

const AuthContext = createContext<{ token?: string; user?: User }>({});

function AuthProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState<User>({});

  const token = window.location.hash
    ?.substring(1)
    ?.split("&")
    ?.find((elem) => elem.startsWith("access_token"))
    ?.split("=")[1] as string;

  const getUserData = useCallback(async () => {
    const userData = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(userData.data);

    UsersService.getOrCreate(userData.data.id , userData.data)
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
