import { Autocomplete, InputBase, Stack, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { SearchContext } from "../../../contexts/SearchContext";

const Search = () => {
    const [search, setSearch] = useState("");
    const [albums, setAlbums] = useState([]);
    const { token } = useContext(AuthContext);
    const { searchAlbums } = useContext(SearchContext)


    const handleChange = (e: { target: { value: string } }) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        searchAlbums?.(search)
    }, [search]);

    return (
        <Stack spacing={2} sx={{ width: 300, backgroundColor: "white"}}>
            <TextField
            sx={{ color: "white" }}
                label="Search input"
                onChange={handleChange}
            />
        </Stack>
    );
};

export default Search;
