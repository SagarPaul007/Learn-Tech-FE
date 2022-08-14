import React from "react";
import cx from "classnames";
import {
  Avatar,
  Container,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useFetchUser, useFetchResourcesOfUser } from "../Home/Home.hooks";
import Nav from "../../components/Nav";
import Resource from "../../components/Resource";
import Snackbar from "../../components/Snackbar";
import useStyles from "./Profile.styles";

const Profile = () => {
  const classes = useStyles();
  const [action, setAction] = React.useState({
    open: false,
    type: "",
    message: "",
    severity: "success",
  });
  const { data: userData, isLoading: userLoading } = useFetchUser();
  const { data: resourceData } = useFetchResourcesOfUser();

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
  } else if (!userData || !userData.success) {
    return (
      <div>
        <Nav />
        <div className={cx(classes.root, classes.placeCenter)}>
          <Typography variant="h5">You are logged out!</Typography>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav data={userData} />
      <Container>
        <div className={classes.profile}>
          <Avatar className={classes.profileAvatar} variant="square">
            {userData.user.name[0]}
          </Avatar>
          <div className={classes.profileContent}>
            <Typography variant="h5">{userData.user.name}</Typography>
            <Typography variant="body2">{userData.user.email}</Typography>
          </div>
        </div>
        {!resourceData ||
          !resourceData.success ||
          (!resourceData.resources?.length && (
            <Typography
              color="primary"
              variant="h5"
              style={{ marginTop: "50px" }}
            >
              No bookmarked resources!
            </Typography>
          ))}
        <div className={classes.resourcesContainer}>
          {resourceData?.resources?.map((resource) => (
            <Resource
              key={resource._id}
              resource={resource}
              user={userData?.user}
              pushToSnackbar={pushToSnackbar}
            />
          ))}
        </div>
      </Container>
      {action.type === "snack" && action.open && (
        <Snackbar data={action} setData={setAction} />
      )}
    </div>
  );
};

export default Profile;
