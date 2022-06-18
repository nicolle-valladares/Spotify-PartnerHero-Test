import axios from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "../services/users.service";
import { Library } from "../types/library";
import { User } from "../types/user";

const AuthContext = createContext<{
  token?: string;
  user?: User;
  library?: Library;
}>({});

function AuthProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState<User>({});
  const [library, setLibrary] = useState<Library>({});
  const navigate = useNavigate();

  const urlToken = window.location.hash
    ?.substring(1)
    ?.split("&")
    ?.find((elem) => elem.startsWith("access_token"))
    ?.split("=")[1] as string;

  if (urlToken) {
    sessionStorage.setItem('token', urlToken)
  }

  const sessionToken = sessionStorage.getItem("token");

  const token = urlToken ? urlToken : sessionToken ?? ''

  const getUserData = useCallback(async () => {
    if (token) {
      const userData = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(userData.data);

      const { display_name, id } = userData.data;
      const libraryData = await UsersService.getOrCreate(userData.data.id, {
        display_name,
        id,
      });
      setLibrary(libraryData);
    }
    if (user?.id) navigate("/home");
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
