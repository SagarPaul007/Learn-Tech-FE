import React from "react";
import cx from "classnames";

import { Drawer, Chip, IconButton } from "@material-ui/core";
import { CircularProgress, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import FilterListIcon from "@material-ui/icons/FilterList";

import AddEditResource from "../../components/AddEditResource";
import Snackbar from "../../components/Snackbar";
import categories from "../../constants/categories";
import Nav from "../../components/Nav";
import Resource from "../../components/Resource";
import Filter from "../../components/Filter";
import { fetchAPI } from "../../utils/common";

import { useFetchUser, useFetchResources } from "./Home.hooks";
import useStyles from "./Home.styles";

const Home = () => {
  const classes = useStyles();
  const lastElementRef = React.useRef(null);
  const [category, setCategories] = React.useState("programming");
  const [tags, setTags] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [resources, setResources] = React.useState([]);
  const [info, setInfo] = React.useState(true);
  const [action, setAction] = React.useState({
    open: false,
    type: "",
    message: "",
    severity: "success",
  });

  const { data: userData, isLoading: userLoading } = useFetchUser();
  const {
    data: resourcesData,
    isLoading: resourcesLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useFetchResources({ category, selectedTags });

  React.useEffect(() => {
    if (userData) {
      setInfo(!userData.success);
    }
  }, [userData]);

  React.useEffect(() => {
    const element = lastElementRef.current;
    if (!element || isFetching || !hasNextPage) return () => null;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((each) => each.isIntersecting)) fetchNextPage();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetching]);

  React.useEffect(() => {
    if (resourcesData) {
      const all =
        resourcesData?.pages?.map?.((each) => each?.resources || [])?.flat() ||
        [];
      setResources(all);
    }
  }, [resourcesData]);

  React.useEffect(() => {
    async function fetchData() {
      const tagsData = await fetchAPI({
        url: `/tags/getTags/${category}`,
        method: "GET",
      });
      setTags(tagsData.tags || []);
    }
    fetchData();
  }, [category]);

  const pushToSnackbar = (message, severity) => {
    setAction({
      open: true,
      type: "snack",
      message,
      severity,
    });
  };

  if (userLoading) {
    return (
      <div className={cx(classes.root, classes.placeCenter)}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {info && (
        <Alert onClose={() => setInfo(false)} severity="info">
          Sign Up / Log In now to get full access to the application.
        </Alert>
      )}
      <Nav data={userData} />
      {userData?.success && (
        <>
          <div className={classes.user}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.mr2}
            >
              {`Welcome, ${userData.user?.name}.`}
            </Typography>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setAction({ type: "add", open: true })}
            >
              Add Resource
            </Button>
          </div>
        </>
      )}
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <div className={classes.parentTag}>
            {categories.map((e) => (
              <Chip
                key={e}
                label={e}
                variant={category === e ? "default" : "outlined"}
                color="primary"
                style={{
                  textTransform: "capitalize",
                  margin: "8px 0px 0px 8px",
                }}
                onClick={() => setCategories(e)}
              />
            ))}
          </div>
          <div className={classes.resourcesContainer}>
            {!resourcesLoading &&
              resources.map((resource) => (
                <Resource
                  key={resource._id}
                  resource={resource}
                  user={userData?.user}
                  pushToSnackbar={pushToSnackbar}
                />
              ))}
          </div>
          <div ref={lastElementRef} className={classes.lastElement}>
            {hasNextPage ? (
              <CircularProgress size={22} />
            ) : (
              <Typography variant="subtitle2">No more Resources.</Typography>
            )}
          </div>
        </div>
        <div className={classes.rightContainer}>
          <div className={classes.flex}>
            <IconButton
              color="primary"
              onClick={() => setAction({ type: "filter", open: true })}
              className={classes.mr1}
            >
              <FilterListIcon />
            </IconButton>
            <span>{category}</span>
          </div>
          <div>
            {tags?.map((tag) => (
              <Chip
                key={tag._id}
                label={`${tag.name} (${tag.count})`}
                variant={
                  selectedTags.includes(tag.name) ? "default" : "outlined"
                }
                style={{ margin: "5px" }}
                onClick={() => {
                  if (selectedTags.includes(tag.name)) {
                    setSelectedTags(selectedTags.filter((t) => t !== tag.name));
                  } else {
                    setSelectedTags([...selectedTags, tag.name]);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {action.type === "add" && (
        <Drawer
          anchor="right"
          open={action.open}
          onClose={() => setAction({ type: "", open: false })}
        >
          <AddEditResource
            action="add"
            close={() => setAction({ type: "", open: false })}
            pushToSnackbar={pushToSnackbar}
          />
        </Drawer>
      )}
      {action.type === "filter" && (
        <Drawer
          anchor="right"
          open={action.open}
          onClose={() => setAction({ type: "", open: false })}
        >
          <Filter
            close={() => setAction({ type: "", open: false })}
            pushToSnackbar={pushToSnackbar}
          />
        </Drawer>
      )}
      {action.type === "snack" && action.open && (
        <Snackbar data={action} setData={setAction} />
      )}
    </div>
  );
};

export default Home;
