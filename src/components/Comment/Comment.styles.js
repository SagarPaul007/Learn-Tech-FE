import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
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
    width: "100%",
    padding: theme.spacing(1),
    border: "1px solid #e0e0e0",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    marginTop: 3,
  },
}));
