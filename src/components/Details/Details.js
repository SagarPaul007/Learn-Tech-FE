import React from "react";
import { useQueryClient } from "react-query";
import cx from "classnames";
import millify from "millify";

import {
  Avatar,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import LaunchIcon from "@material-ui/icons/Launch";
import SendIcon from "@material-ui/icons/Send";

import DrawerHeader from "../DrawerHeader";
import { fetchAPI } from "../../utils/common";
import { useFetchResource } from "./Details.hooks";
import useStyles from "./Details.styles";
import Comment from "../Comment/Comment";

const Details = ({ resourceId, user, close, pushToSnackbar }) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [comment, setComment] = React.useState("");
  const { data, isLoading, isError } = useFetchResource(resourceId);
  const { title, description, url, likes, comments } = data?.resource || {};

  const liked = likes?.includes(user?._id);
  const bookmarked = user?.resources?.includes(resourceId);

  const likeUnlike = async () => {
    if (!user?._id) {
      pushToSnackbar("Please log in first!", "info");
      return;
    }
    const res = await fetchAPI({
      url: "/resources/likeUnlike",
      method: "POST",
      body: {
        resourceId,
      },
    });
    if (!res.success) {
      pushToSnackbar(res.message || "Something went wrong!", "error");
    } else {
      pushToSnackbar("Feedback received!", "success");
      queryClient.invalidateQueries(["resource"]);
      queryClient.invalidateQueries(["resources"]);
    }
  };

  const bookmark = async () => {
    if (!user?._id) {
      pushToSnackbar("Please log in first!", "info");
      return;
    }
    const res = await fetchAPI({
      url: "/resources/bookmark",
      method: "POST",
      body: {
        resourceId,
      },
    });
    if (!res.success) {
      pushToSnackbar(res.message || "Something went wrong!", "error");
    } else {
      pushToSnackbar("Resource bookmarked!", "success");
      queryClient.invalidateQueries(["user"]);
    }
  };

  const addComment = async () => {
    if (!user?._id) {
      pushToSnackbar("Please log in first!", "info");
      return;
    }
    const res = await fetchAPI({
      url: "/resources/addComment",
      method: "POST",
      body: {
        resourceId,
        comment,
      },
    });
    if (!res.success) {
      pushToSnackbar(res.message || "Something went wrong!", "error");
    } else {
      pushToSnackbar("Comment added!", "success");
      queryClient.invalidateQueries(["resource"]);
    }
    setComment("");
  };

  if (isLoading) {
    return (
      <div className={cx(classes.root, classes.placeCenter)}>
        <CircularProgress color="secondary" />
      </div>
    );
  } else if (isError) {
    return (
      <div className={cx(classes.root, classes.placeCenter)}>
        <Typography variant="body1">Something went wrong!</Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <DrawerHeader message="Resource Details" close={close} />
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={cx(classes.flex, classes.alignCenter)}>
            <Avatar
              variant="square"
              alt="resource"
              src={`https://logo.clearbit.com/${url}`}
              onClick={() => window.open(url, "_blank")}
              className={classes.mr2}
            />
            <Typography variant="h6">{title}</Typography>
          </div>
          <Typography
            className={classes.mt2}
            variant="body1"
            component="p"
            color="textSecondary"
          >
            {description}
          </Typography>
          <div
            className={cx(classes.flex, classes.justifyBetween, classes.mt2)}
          >
            <div className={cx(classes.flex, classes.alignCenter)}>
              <Tooltip title="I like this" placement="top">
                <IconButton
                  aria-label="Like"
                  onClick={() => likeUnlike()}
                  color={liked ? "primary" : "default"}
                >
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
              <Typography
                variant="body2"
                color="primary"
                component="p"
                style={{ marginLeft: "5px" }}
              >
                {millify(likes?.length || 0)}
              </Typography>
            </div>
            <Tooltip title="Bookmark" placement="top">
              <IconButton
                aria-label="bookmark"
                onClick={() => bookmark()}
                color={bookmarked ? "primary" : "default"}
              >
                <BookmarkIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Visit the website" placement="top">
              <IconButton
                aria-label="launce"
                onClick={() => window.open(url, "_blank")}
              >
                <LaunchIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div
          className={cx(
            classes.card,
            classes.mt2,
            classes.flex,
            classes.alignCenter
          )}
        >
          <TextField
            label="Comment"
            value={comment}
            multiline
            fullWidth
            className={classes.mr2}
            onChange={(e) => setComment(e.target.value)}
          />
          <Tooltip title="Send" placement="top">
            <IconButton
              aria-label="send"
              color="primary"
              onClick={() => addComment()}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>
        </div>
        {!!comments?.length && (
          <div className={classes.mt2}>
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
