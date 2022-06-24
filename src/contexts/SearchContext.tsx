import axios from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Albums } from "../types/releaseItem";
import { AuthContext } from "./AuthContext";

const SearchContext = createContext<{
  albums?: Albums[];
  searchAlbums?: (search: string) => void;
}>({});

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [albums, setAlbums] = useState([]);
  const { token } = useContext(AuthContext);

  const searchAlbums = useCallback(async (search: string) => {
    let searchAlbum = await axios.get(
      `${process.env.REACT_APP_API_URL}/search?query=${search}&type=track`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAlbums(searchAlbum.data.tracks.items);
  }, []);

  return (
    <SearchContext.Provider value={{ albums, searchAlbums }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
