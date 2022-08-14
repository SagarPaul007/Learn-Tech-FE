import React from "react";
import DrawerHeader from "../DrawerHeader";
import categories from "../../constants/categories";
import useStyles from "./SelectCategories.styles";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";

const SelectCategories = ({ data, setData, close }) => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(data || []);

  const handleSelectAll = () => {
    if (selected.length === categories.length) {
      setSelected([]);
    } else {
      setSelected(categories);
    }
  };

  const handleSelect = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((each) => each !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div className={classes.root}>
      <DrawerHeader message="Select categories" close={close} />
      <div className={classes.form}>
        <FormGroup className={classes.group}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                onChange={() => handleSelectAll()}
                checked={selected.length === categories.length}
              />
            }
            label="SELECT ALL"
          />
          <Divider style={{ marginBottom: "10px" }} />
          {categories.map((each, i) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleSelect(each)}
                  color="primary"
                  checked={selected.includes(each)}
                />
              }
              label={each.toUpperCase()}
            />
          ))}
        </FormGroup>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          style={{ marginTop: "16px" }}
          onClick={() => {
            setData(selected);
            close();
          }}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default SelectCategories;
