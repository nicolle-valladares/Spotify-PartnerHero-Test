import { Box } from "@mui/material";
import SearchList from "../layout/search/SearchList";
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
      <SearchList />
    </Box>
  );
};

export default Home;
