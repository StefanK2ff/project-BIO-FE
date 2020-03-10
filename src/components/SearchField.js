import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(2)

    }
  }
}));

export default function SearchField(props) {
  const classes = useStyles();

  return (
    <>
    <Grid item xs={12} className={classes.root}>
      <TextField
        className={classes.margin}
        label="Search for books here"
        variant="outlined"
        fullWidth
        noValidate
        autoComplete="off"
        name="query"
        value={props.query}
        onChange={props.handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      </Grid>
     
      <Grid item xs={12} gutterBottom>
      <Typography gutterBottom variant="caption">
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
        </Typography>
        </Grid>
     
    </>
  );
}
