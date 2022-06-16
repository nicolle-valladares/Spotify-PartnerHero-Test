import { useState } from "react";
import "./Navbar.css";
import axios from "axios";
// MATERIAL COMPONENTS
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "#1b1b1b",
        color: "#ffffff",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          PartnerHero ReactJS Assessment
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
