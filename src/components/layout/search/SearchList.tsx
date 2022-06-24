import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import { LibraryContext } from "../../../contexts/LibraryContext";
import { SearchContext } from "../../../contexts/SearchContext";
import librariesService from "../../../services/libraries.service";

const SearchList = () => {
  const { albums } = useContext(SearchContext);
  const { library } = useContext(LibraryContext);

  const saveToLibrary = (id: string) => {
    if (!library?.items?.map((item) => item.id).includes(id)) {
      library?.items?.push({ id, type: "track" });
      if (library?.id) librariesService.update(library?.id, library);
    }
  };
  
  return (
    <List>
      Search Results
      {albums?.map((album) => {
        const labelId = `checkbox-list-secondary-label-${album}`;
        return (
          <ListItem
            key={album.id}
            secondaryAction={
              <Button
                sx={{ color: "white" }}
                variant="text"
                onClick={() => saveToLibrary(album?.album?.id ?? "")}
              >
                {library?.items?.map((item) => item.id).includes(album?.album?.id ?? "")
                  ? "-"
                  : "+"}
              </Button>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar src={`${album.album?.images?.[0]?.url}`} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${album.name}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SearchList;
