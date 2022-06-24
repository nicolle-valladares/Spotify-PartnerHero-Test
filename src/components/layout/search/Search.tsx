import { Stack, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../../contexts/SearchContext";

const Search = () => {
  const [search, setSearch] = useState("");
  const { searchAlbums } = useContext(SearchContext);

  const handleChange = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    searchAlbums?.(search);
  }, [search]);

  return (
    <Stack spacing={2} sx={{ width: 300, backgroundColor: "white" }}>
      <TextField
        sx={{ color: "white" }}
        label="Search input"
        onChange={handleChange}
      />
    </Stack>
  );
};

export default Search;
