import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import {
  Box,
  Button,
  Card,
  ImageListItemBar,
  ImageListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Items } from "../../types/releaseItem";
import { LibraryContext } from "../../contexts/LibraryContext";
import librariesService from "../../services/libraries.service";

const Library = () => {
  const [albums, setAlbums] = useState<Items[]>([]);
  const { token } = useContext(AuthContext);
  const { library } = useContext(LibraryContext);

  const getAlbums = useCallback(async () => {
    if (library?.items?.length) {
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

  const removeFromLibrary = (id: string) => {
    if (library?.items?.length) {
      let newLibrary = library;
      newLibrary.items = library?.items.filter((lib) => lib !== id);

      if (library?.id) librariesService.update(library?.id, newLibrary);
    }
  };

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - 288px)` },
      }}
    >
      <Toolbar />
      <Typography variant="h6" noWrap component="div">
        My Library
      </Typography>
      <Box
        sx={{
          display: "flex",
          py: 1,
          overflow: "auto",
          flexFlow: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {albums.map((song) => (
          <Fragment key={song?.name}>
            <Card sx={{ maxWidth: "250px", backgroundColor: "#1db954" }}>
              <ImageListItem sx={{ width: 250, height: 150 }}>
                <img
                  src={`${song?.images?.[0]?.url}?w=248&fit=crop&auto=format`}
                  srcSet={`${song?.images?.[0]?.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={song?.name}
                  loading="lazy"
                />
                <ImageListItemBar title={song?.name} />
              </ImageListItem>
              <Button
                sx={{ color: "white" }}
                onClick={() => song?.id && removeFromLibrary(song?.id)}
              >
                - REMOVE
              </Button>
            </Card>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Library;
