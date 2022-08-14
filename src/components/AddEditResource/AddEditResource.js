import React from "react";
import { useQueryClient } from "react-query";

import {
  TextField,
  InputAdornment,
  Button,
  Chip,
  Drawer,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import CreateIcon from "@material-ui/icons/Create";
import DescriptionIcon from "@material-ui/icons/Description";
import LinkIcon from "@material-ui/icons/Link";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import { fetchAPI } from "../../utils/common";
import DrawerHeader from "../DrawerHeader";
import SelectCategories from "../SelectCategories";
import useStyles from "./AddEditResource.styles";

const AddEditResource = ({ initialDetails, close, action, pushToSnackbar }) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);
  const [tag, setTag] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [resourceData, setResourceData] = React.useState(
    initialDetails
      ? initialDetails
      : {
          title: "",
          description: "",
          url: "",
          categories: [],
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

  const setCategories = (x) => {
    setResourceData({
      ...resourceData,
      categories: x,
    });
  };

  const handleChange = (event) => {
    setResourceData({
      ...resourceData,
      [event.target.name]: event.target.value,
    });
  };

  const addEditHandler = async (data, action) => {
    setLoading(true);
    const response = await fetchAPI({
      url: `/resources/${action}`,
      method: "POST",
      body: data,
    });
    if (!response?.success) {
      pushToSnackbar(response?.message, "error");
    } else {
      pushToSnackbar(response?.message, "success");
    }
    setLoading(false);
    queryClient.invalidateQueries(["resources"]);
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
                  color="primary"
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
            className={classes.mt2}
            size="large"
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => setOpen(!open)}
            endIcon={<ArrowRightIcon color="primary" />}
          >
            {`Select Categories (${resourceData.categories.length})`}
          </Button>
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
      {open && (
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <SelectCategories
            data={resourceData.categories}
            setData={setCategories}
            close={() => setOpen(false)}
          />
        </Drawer>
      )}
    </>
  );
};

export default AddEditResource;
