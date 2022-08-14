import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: 500,
    height: "100vh",
    backgroundColor: "#F7FBFC",
  },
  form: {
    margin: theme.spacing(1, 3),
  },
  group: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "5px",
    padding: theme.spacing(1, 2),
  },
}));
