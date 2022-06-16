import { Box } from "@mui/material";

import Releases from "../releases/Releases";

const Home = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - 288px)` },
      }}
    >
      <Releases />
    </Box>
  );
};

export default Home;
