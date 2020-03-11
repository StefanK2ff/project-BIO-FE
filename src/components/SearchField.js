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

import Box from "@material-ui/core/Box";

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
        <Box p="0">
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
        </Box>
      </Grid>

      <Grid item xs={12} gutterBottom>
        <Typography gutterBottom variant="caption">
          <RadioGroup name="searchFilter" row>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="space-around"
              alignItems="flex-start"
            >
              <FormControlLabel
                value=""
                control={<Radio color="primary" />}
                label="All"
                name="searchFilter"
                checked={props.searchFilter === ""}
                onChange={props.handleSearchSettings}
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="intitle:"
                control={<Radio color="primary" />}
                label="Title"
                name="searchFilter"
                checked={props.searchFilter === "intitle:"}
                onChange={props.handleSearchSettings}
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="inauthor:"
                control={<Radio color="primary" />}
                label="Author"
                name="searchFilter"
                checked={props.searchFilter === "inauthor:"}
                onChange={props.handleSearchSettings}
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="inpublisher:"
                control={<Radio color="primary" />}
                label="Publisher"
                name="searchFilter"
                checked={props.searchFilter === "inpublisher:"}
                onChange={props.handleSearchSettings}
                labelPlacement="bottom"
              />
              {/* <FormControlLabel
            value="isbn:"
            control={<Radio color="primary" />}
            label="ISBN"
            name="searchFilter"
            checked={props.searchFilter === "isbn:"}
            onChange={props.handleSearchSettings}
            labelPlacement="bottom"
          /> */}
            </Grid>
          </RadioGroup>
        </Typography>
      </Grid>
    </>
  );
}
