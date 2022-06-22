import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import librariesService from "../services/libraries.service";
import { Library } from "../types/library";

const LibraryContext = createContext<{
  library?: Library;
}>({});

const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [library, setLibrary] = useState<Library | undefined>();

  const getLibraries = useCallback(() => {
    librariesService.getAll().onSnapshot((librarySnap) => {
      const data = librarySnap.docs[0].data();
      setLibrary(data);
    });
  }, []);

  useEffect(() => {
    getLibraries();
  }, [getLibraries]);
  return (
    <LibraryContext.Provider value={{ library }}>
      {children}
    </LibraryContext.Provider>
  );
};

export { LibraryContext, LibraryProvider };
