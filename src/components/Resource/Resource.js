import React from "react";
import cx from "classnames";
import { useQueryClient } from "react-query";
import millify from "millify";
import {
  Typography,
  IconButton,
  Tooltip,
  Card,
  CardHeader,
  Link,
  CardContent,
  CardActions,
  Avatar,
} from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FavoriteIcon from "@material-ui/icons/Favorite";
import OpenWithIcon from "@material-ui/icons/OpenWith";

import { fetchAPI } from "../../utils/common";
import { getDate } from "../../utils/dateFormatter";
import useStyles from "./Resource.styles";

const Resource = ({ resource, user, pushToSnackbar }) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const { title, description, url, addedBy, createdAt } = resource;
  const modifiedDescription =
    description.length > 180
      ? `${description.substring(0, 180)}...`
      : description;

  const liked = resource.likes?.includes(user?._id);
  const bookmarked = user?.resources?.includes(resource?._id);

  const likeUnlike = async () => {
    if (!user?._id) {
      pushToSnackbar("Please log in first!", "info");
      return;
    }
    const res = await fetchAPI({
      url: "/resources/likeUnlike",
      method: "POST",
      body: {
        resourceId: resource._id,
      },
    });
    if (!res.success) {
      pushToSnackbar(res.message || "Something went wrong!", "error");
    } else {
      pushToSnackbar("Feedback received!", "success");
      queryClient.invalidateQueries(["resources"]);
      queryClient.invalidateQueries(["userResources"]);
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
        resourceId: resource._id,
      },
    });
    if (!res.success) {
      pushToSnackbar(res.message || "Something went wrong!", "error");
    } else {
      pushToSnackbar("Resource bookmarked!", "success");
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["userResources"]);
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            className={classes.avatar}
            variant="square"
            alt="resource"
            src={`https://logo.clearbit.com/${url}`}
            onClick={() => window.open(url, "_blank")}
          />
        }
        action={
          <Tooltip title="Bookmark" placement="top">
            <IconButton
              aria-label="bookmark"
              onClick={() => bookmark()}
              color={bookmarked ? "primary" : "default"}
            >
              <BookmarkIcon />
            </IconButton>
          </Tooltip>
        }
        title={title}
      />
      <CardContent>
        <Tooltip title="Visit the website" placement="top">
          <Link
            variant="body1"
            underline="none"
            href={url}
            target="_blank"
            rel="noopener"
            color="primary"
          >
            {url}
          </Link>
        </Tooltip>
        <Typography
          className={cx(classes.mb2, classes.mt2)}
          variant="body2"
          component="p"
        >
          {modifiedDescription}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`~ ${addedBy?.name} (${getDate(createdAt)})`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <>
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
            {millify(resource.likes?.length || 0)}
          </Typography>
        </>
        <Tooltip title="View more details" placement="top">
          <IconButton aria-label="view more" className={classes.link}>
            <OpenWithIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Resource;
