import { Avatar, Checkbox, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useContext } from "react";
import { SearchContext } from "../../../contexts/SearchContext";

const SearchList = () => {
  const {albums} = useContext(SearchContext)
  
    return (
      <List>
          Search Results
        {albums?.map((album) => {
          const labelId = `checkbox-list-secondary-label-${album}`;
          return (
            <ListItem
              key={album.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  {/* <Avatar
                    src={`/static/images/avatar/${album.album.images[0].url}.jpg`}
                  /> */}
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${album.name}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
}

export default SearchList;