import React from "react";

import {
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Chip,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import CreateIcon from "@material-ui/icons/Create";
import DescriptionIcon from "@material-ui/icons/Description";
import LinkIcon from "@material-ui/icons/Link";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

import { fetchAPI } from "../../utils/common";
import DrawerHeader from "../DrawerHeader";
import parentTags from "../../constants/parentTags";
import useStyles from "./AddEditResource.styles";

const AddEditResource = ({ initialDetails, close, action, pushToSnackbar }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [tag, setTag] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [resourceData, setResourceData] = React.useState(
    initialDetails
      ? initialDetails
      : {
          title: "",
          description: "",
          url: "",
          parentTag: "",
          tags: [],
        }
  );

  React.useEffect(() => {
    async function getSuggestions() {
      if (tag) {
        const tagSuggestions = await fetchAPI({
          url: `/tags/getSuggestions/${tag}`,
          method: "GET",
        });
        setOptions(tagSuggestions?.tags || []);
      }
    }
    getSuggestions();
  }, [tag]);

  const handleChange = (event) => {
    setResourceData({
      ...resourceData,
      [event.target.name]: event.target.value,
    });
  };

  const addEditHandler = async (data, action) => {
    setLoading(true);
  };

  return (
    <>
      <div className={classes.root}>
        <DrawerHeader message={`${action} Resource`} close={close} />
        <div className={classes.form}>
          <TextField
            variant="outlined"
            fullWidth
            label="Title"
            name="title"
            className={classes.mt2}
            value={resourceData.title}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreateIcon color="primary" />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            fullWidth
            multiline
            label="Description"
            name="description"
            required
            className={classes.mt2}
            value={resourceData.description}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <DescriptionIcon color="primary" />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="URL"
            name="url"
            required
            className={classes.mt2}
            value={resourceData.url}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LinkIcon color="primary" />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            className={classes.mt2}
            variant="outlined"
            label="Category"
            required
            name="parentTag"
            value={resourceData.parentTag}
            onChange={handleChange}
          >
            {parentTags.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Autocomplete
            multiple
            freeSolo
            className={classes.mt2}
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocalOfferIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setTag(e.target.value)}
              />
            )}
            onChange={(e, value) =>
              setResourceData({
                ...resourceData,
                tags: value,
              })
            }
          />
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.mt2}
            disabled={loading}
            onClick={() => addEditHandler(resourceData, action)}
          >
            {action}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddEditResource;
