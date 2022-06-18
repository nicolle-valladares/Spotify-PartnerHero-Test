import { Box } from "@mui/material";

import Navbar from "./navbar/Navbar";
import Drawer from "./drawer/Drawer";
import { SearchProvider } from "../../contexts/SearchContext";

const Layout = (props: any) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SearchProvider>
        <Navbar />
        <Drawer />
        {props.children}
      </SearchProvider>
    </Box>
  );
};

export default Layout;
