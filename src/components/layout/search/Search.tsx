import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const Search = () => {
  const [search, setSearch] = useState("");
  const { token } = useContext(AuthContext);

  const handleChange = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
  };

  const searchAlbums = useCallback(async () => {
    await axios.get(
      `${process.env.REACT_APP_API_URL}/search?query=bob&type=track&name=${search}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }, [search]);

  const Search = styled("div")(() => ({
    position: "relative",
    marginLeft: 0,
    width: "100%",
  }));

  const StyledInputBase = styled(InputBase)(() => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      width: "100%",
    },
  }));

  useEffect(() => {
    searchAlbums();
  }, [searchAlbums]);

  return (
    <Search>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
      />
    </Search>
  );
};

export default Search;
