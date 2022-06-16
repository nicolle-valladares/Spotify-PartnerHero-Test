import { Box } from "@mui/material";

import Navbar from "./navbar/Navbar";
import Drawer from "./drawer/Drawer";

const Layout = (props: any) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Drawer />
      {props.children}
    </Box>
  );
};

export default Layout;
