import { useState } from "react";
import "./Navbar.css";

// MATERIAL COMPONENTS
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const redirectHome = () => {
    navigate("/home");
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
      <Toolbar onClick={redirectHome}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography
          sx={{ cursor: "pointer" }}
          variant="h6"
          noWrap
          component="div"
        >
          PartnerHero ReactJS Assessment
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
