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

export default function SearchField(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Search for books here"
        variant="outlined"
        fullWidth
        name="query"
        value={props.query}
        onChange={props.handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormControl component="fieldset">
      <FormLabel component="legend">Specify your search here</FormLabel>
      <RadioGroup name="searchFilter" row>
        <FormControlLabel
          value=""
          control={<Radio color="primary" />}
          label="All fields"
          name="searchFilter"
          checked={props.searchFilter === ""}
          onChange={props.handleSearchSettings}
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="intitle:"
          control={<Radio color="primary" />}
          label="Only title"
          name="searchFilter"
          checked={props.searchFilter === "intitle:"}
          onChange={props.handleSearchSettings}
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="inauthor:"
          control={<Radio color="primary" />}
          label="Only author"
          name="searchFilter"
          checked={props.searchFilter === "inauthor:"}
          onChange={props.handleSearchSettings}
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="inpublisher:"
          control={<Radio color="primary" />}
          label="Only publisher"
          name="searchFilter"
          checked={props.searchFilter === "inpublisher:"}
          onChange={props.handleSearchSettings}
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="isbn:"
          control={<Radio color="primary" />}
          label="Only ISBN"
          name="searchFilter"
          checked={props.searchFilter === "isbn:"}
          onChange={props.handleSearchSettings}
          labelPlacement="bottom"
        />
        
         </RadioGroup>
    </FormControl>
    </form>
  );
}

