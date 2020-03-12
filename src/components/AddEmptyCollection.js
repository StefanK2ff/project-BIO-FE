import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createCollectionWithItems } from "./../lib/collections-services";
import { withAuth } from "./../lib/Auth";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

class AddEmptyCollection extends Component {
  state = {
    newCollection: ""
  };

  formHandleChange = e => {
    e.preventDefault();
    let { value, name } = e.target;
    this.setState({ [name]: value });
  };

  addColl = e => {
    e.preventDefault();
    createCollectionWithItems(
      this.props.user._id,
      [],
      this.state.newCollection
    ); //owner, items, name
    this.setState({ newCollection: "" }, () => {
      this.props.updateColl();
      this.props.refresh(this.props.user._id);
    });
  };

  handleMouseDown = event => {
    event.preventDefault();
  };

  render() {
    return (
      <>
        <Box py="20px">
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <TextField
                label="Add an empty collection here"
                variant="outlined"
                fullWidth
                noValidate
                autoComplete="off"
                name="newCollection"
                value={"" + this.state.newCollection}
                onChange={this.formHandleChange}
                InputProps={
                  ({
                    startAdornment: (
                      <InputAdornment position="start">
                        <CollectionsBookmarkIcon />
                      </InputAdornment>
                    )
                  },
                  {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.addColl}
                          onMouseDown={this.handleMouseDown}
                          edge="end"
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  })
                }
              />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withAuth(AddEmptyCollection);
