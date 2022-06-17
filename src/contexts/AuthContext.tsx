import axios from "axios";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import UsersService from "../services/users.service";
import { Library } from "../types/library";
import { User } from "../types/user";

const AuthContext = createContext<{ token?: string; user?: User; library?: Library }>({});

function AuthProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState<User>({});
  const [library, setLibrary] = useState<Library>({})

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

    const { display_name, id } = userData.data
    const libraryData = await UsersService.getOrCreate(userData.data.id, { display_name, id })
    setLibrary(libraryData)
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <AuthContext.Provider value={{ token, user, library }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
