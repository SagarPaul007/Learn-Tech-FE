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
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 2),
    display: "flex",
    justifyContent: "space-between",
  },
  user: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 3),
  },
  resourcesContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
  },
  leftContainer: {
    maxHeight: "calc(100vh - 150px)",
    overflow: "auto",
  },
  rightContainer: {
    width: 300,
  },
  lastElement: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.grey[200],
  },
}));
