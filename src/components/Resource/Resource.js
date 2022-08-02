import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import tech from "../../static/tech.jpg";

const Resource = ({ resource }) => {
  return (
    <Card
      style={{ maxWidth: 300, margin: "5px 10px", backgroundColor: "#E8F4FD" }}
    >
      <CardMedia component="img" height="140" image={tech} alt="Technology" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {resource.title}
        </Typography>
        <Typography variant="body2">{resource.description}</Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Visit this page" placement="top" arrow>
          <IconButton color="primary">
            <LaunchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add to Bookmark" placement="top" arrow>
          <IconButton color="primary">
            <BookmarkIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Resource;
