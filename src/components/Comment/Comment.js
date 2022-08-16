import React from "react";
import cx from "classnames";
import { Avatar, Typography } from "@material-ui/core";
import { getDate } from "../../utils/dateFormatter";
import useStyles from "./Comment.styles";

const Comment = ({ comment }) => {
  const classes = useStyles();
  if (!comment) return null;
  else if (!comment.content) return null;
  return (
    <div className={classes.flex}>
      <Avatar className={cx(classes.mr2, classes.avatar)}>
        {comment?.by?.name?.[0]}
      </Avatar>
      <div className={classes.card}>
        <div
          className={cx(
            classes.flex,
            classes.justifyBetween,
            classes.alignCenter
          )}
        >
          <Typography variant="subtitle1" color="primary">
            {comment?.by?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {getDate(comment?.createdAt)}
          </Typography>
        </div>
        <Typography variant="body2">{comment?.content}</Typography>
      </div>
    </div>
  );
};

export default Comment;
