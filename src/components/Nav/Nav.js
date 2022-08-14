import React from "react";
import { useNavigate } from "react-router-dom";
import cx from "classnames";
import { AppBar, Toolbar, Button, IconButton, Link } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import { logout } from "../../utils/common";
import useStyles from "./Nav.styles";

const Nav = ({ data }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar
        className={cx(
          classes.flex,
          classes.justifyBetween,
          classes.alignCenter
        )}
      >
        <div className={cx(classes.flex, classes.alignCenter)}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.mr2}
          >
            <MenuIcon />
          </IconButton>
          <Link
            href="/"
            variant="h6"
            underline="none"
            style={{ color: "white" }}
          >
            Learn Tech
          </Link>
        </div>
        {!data?.success && (
          <div className={cx(classes.flex, classes.alignCenter)}>
            <Button
              variant="text"
              color="inherit"
              className={classes.mr2}
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Button
              variant="text"
              color="inherit"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        )}
        {data?.success && (
          <div className={cx(classes.flex, classes.alignCenter)}>
            <IconButton
              color="inherit"
              className={classes.profile}
              onClick={() => navigate("/profile")}
            >
              <PersonIcon />
            </IconButton>
            <Button variant="text" color="inherit" onClick={() => logout()}>
              Log Out
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
