import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import {
  Avatar,
  Box,
  Drawer as MaterialDrawer,
  Divider,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Toolbar,
  ListItemIcon,
} from "@mui/material";

import QueueMusicIcon from "@mui/icons-material/QueueMusic";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Search from "../search/Search";

const Drawer = () => {
  const [search, setSearch] = useState("");
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
  };

  const searchAlbums = useCallback(async () => {
    await axios.get(
      `${process.env.REACT_APP_API_URL}/search?type=track&name=${search}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }, [search]);

  const goToMyLibrary = () => {
    navigate("/library");
  };

  useEffect(() => {
    searchAlbums();
  }, [searchAlbums]);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <MaterialDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            backgroundColor: "#1b1b1b",
            color: "#ffffff",
          },
        }}
        open
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={user?.images?.[0]?.url} />
            </ListItemAvatar>
            <ListItemText primary={user?.display_name} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Search />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <QueueMusicIcon sx={{ color: "#1db954" }} />
            </ListItemIcon>
            <ListItemText
              sx={{ cursor: "pointer" }}
              onClick={goToMyLibrary}
              primary="My Library"
            />
          </ListItem>
        </List>
      </MaterialDrawer>
    </Box>
  );
};

export default Drawer;
