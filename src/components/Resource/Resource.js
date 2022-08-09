import React from "react";
import {
  Typography,
  IconButton,
  Tooltip,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FavoriteIcon from "@material-ui/icons/Favorite";

import tech from "../../static/tech.jpg";
import { fetchAPI } from "../../utils/common";
import { getDate } from "../../utils/dateFormatter";
import useStyles from "./Resource.styles";

const Resource = ({ resource, user, pushToSnackbar }) => {
  const classes = useStyles();
  const { title, description, url, addedBy, createdAt } = resource;
  const modifiedDescription =
    description.length > 75
      ? `${description.substring(0, 75)}...`
      : description;

  const liked = resource.like?.includes(user._id);

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
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {resource.addedBy?.name?.charAt(0) || "A"}
          </Avatar>
        }
        action={
          <Tooltip title="Bookmark" placement="top">
            <IconButton aria-label="bookmark">
              <BookmarkIcon />
            </IconButton>
          </Tooltip>
        }
        title={addedBy?.name || "Anonymous"}
        subheader={getDate(createdAt)}
      />
      <CardMedia className={classes.media} image={tech} title="Technology" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {modifiedDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="I like this" placement="top">
          <IconButton
            aria-label="Like"
            onClick={() => likeUnlike()}
            color={liked ? "primary" : "default"}
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Visit the website" placement="top">
          <IconButton
            aria-label="Link"
            className={classes.link}
            onClick={() => window.open(url, "_blank")}
          >
            <OpenInNewIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Resource;
