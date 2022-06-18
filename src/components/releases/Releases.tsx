import { useState, useCallback, useEffect, useContext, Fragment } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  ImageListItemBar,
  ImageListItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../contexts/AuthContext";
import { Items } from "../../types/releaseItem";
import librariesService from "../../services/libraries.service";

const Releases = () => {
  const [newReleases, setNewReleases] = useState<Items[]>([]);
  const { token, library } = useContext(AuthContext);

  const getNewReleases = useCallback(async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/browse/new-releases`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const releases: Items[] = response.data.albums.items;

    setNewReleases(releases);
  }, [token]);

  useEffect(() => {
    getNewReleases();
  }, [getNewReleases]);

  const saveToLibrary = (id: string) => {
    if(!library?.items?.includes(id)) {
        library?.items?.push(id);
        if (library?.id) librariesService.update(library?.id, library);
    }
  };

  return (
    <>
      <Toolbar />
      <Typography variant="h6" noWrap component="div">
        New Releases
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          py: 1,
          overflow: "auto",
          scrollSnapType: "x mandatory",
          "& > *": {
            scrollSnapAlign: "center",
          },
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {newReleases.map((release) => (
          <Fragment key={release?.name}>
            <Card
              sx={{ minWidth: "250px", backgroundColor: "#1db954" }}
            >
              <ImageListItem sx={{ width: 250, height: 150 }}>
                <img
                  src={`${release?.images?.[0]?.url}?w=248&fit=crop&auto=format`}
                  srcSet={`${release?.images?.[0]?.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={release?.name}
                  loading="lazy"
                />
                <ImageListItemBar title={release?.name} />
              </ImageListItem>
              <Button
                sx={{ color: "white" }}
                onClick={() => release?.id && saveToLibrary(release?.id)}
              >
                + Save to Library
              </Button>
            </Card>
          </Fragment>
        ))}
      </Box>
    </>
  );
};

export default Releases;
