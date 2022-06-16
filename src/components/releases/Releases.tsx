import { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";

import {
  Box,
  Card,
  ImageListItemBar,
  ImageListItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../contexts/AuthContext";
import { Items } from "../../types/releaseItem";

const Releases = () => {
  const [newReleases, setNewReleases] = useState<Items[]>([]);
  const { token } = useContext(AuthContext);

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
    const releases: Items[] = response.data.albums.items.filter(
      (item?: Items) => item?.album_type == "single"
    );

    setNewReleases(releases);
  }, [token]);

  useEffect(() => {
    getNewReleases();
  }, [getNewReleases]);

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
          <Card
            key={release?.name}
            sx={{minWidth: '250px'}}
          >
            <ImageListItem sx={{ width: 250, height: 150 }}>
              <img
                src={`${release?.images?.[0]?.url}?w=248&fit=crop&auto=format`}
                srcSet={`${release?.images?.[0]?.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={release?.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={release?.name}
                subtitle="+ Save to Library"
                position="below"
              />
            </ImageListItem>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Releases;
