import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    //   width: 200
    }
  }
}));

export default function SearchField() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Search for books here"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormControl component="fieldset">
      <FormLabel component="legend">Specify your search here</FormLabel>
      <RadioGroup aria-label="position" name="position" value="" onChange="" row>
        <FormControlLabel
          value="top"
          control={<Radio color="primary" />}
          label="label 1"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="top"
          control={<Radio color="primary" />}
          label="label 1"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="top"
          control={<Radio color="primary" />}
          label="label 1"
          labelPlacement="bottom"
        />
        
         </RadioGroup>
    </FormControl>
    </form>
  );
}

