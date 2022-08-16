import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    width: 500,
    height: "100vh",
    overflow: "auto",
  },
  placeCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: theme.spacing(2),
  },
  flex: {
    display: "flex",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  alignCenter: {
    alignItems: "center",
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
  mt2: {
    marginTop: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
  },
}));
