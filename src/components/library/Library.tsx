import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { IconButton, ListItemText, ListItem, List } from "@mui/material";
import axios from "axios";
import { Items } from "../../types/releaseItem";

const Library = () => {
  const [albums, setAlbums] = useState<Items[]>([]);
  const { token, library } = useContext(AuthContext);

  const getAlbums = useCallback(async () => {
    if (library?.items) {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/albums/?ids=${library?.items.join(
          ","
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const libraryAlbums: Items[] = response.data.albums;
      
      setAlbums(libraryAlbums);
    }
  }, [library]);

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  return (
    <List sx={{ width: "100%" }}>
      {albums.map((value) => (
        <ListItem
          key={value.id}
          disableGutters
          secondaryAction={<IconButton aria-label="comment"></IconButton>}
        >
          <ListItemText primary={value.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default Library;
