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
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const Drawer = () => {
  const { user } = useContext(AuthContext);
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
      </MaterialDrawer>
    </Box>
  );
};

export default Drawer;
