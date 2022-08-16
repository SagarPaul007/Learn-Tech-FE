import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  placeCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
  profile: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  resourcesContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[3],
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "calc(100vh - 180px)",
    overflow: "auto",
  },
  profileAvatar: {
    backgroundColor: theme.palette.primary.main,
    width: 80,
    height: 80,
    marginRight: theme.spacing(4),
  },
}));
