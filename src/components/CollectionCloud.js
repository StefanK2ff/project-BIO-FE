import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import {
  createCollectionWithItems,
  modifyCollection
} from "./../lib/collections-services";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

/* NOTES 
    This modulre requires following Data
    - collections from the user (Props)
    - A Book ID
    - Needs a minimal state (just for the form)
    Functions
    1) removeFromCollection
    2) addToCollection
    3) addToNewColl
*/

class CollectionCloud extends Component {
  state = {
    newCollection: ""
  };

  addToCollection = e => {
    e.preventDefault();
    let itemList = this.getItemList(e.target.id);
    let newItemList = [];
    newItemList.push(
      e.target.attributes.getNamedItem("bookid").value,
      ...itemList
    );
    modifyCollection(e.target.id, newItemList, e.target.name); // collectionId, items, name
    this.props.refresh(this.props.user._id);
    this.forceUpdate();
  };

  removeFromCollection = e => {
    e.preventDefault();
    let itemList = this.getItemList(e.target.id);
    const i = itemList.indexOf(
      e.target.attributes.getNamedItem("bookid").value
    );
    if (i > -1) itemList.splice(i, 1);
    modifyCollection(e.target.id, itemList, e.target.name); // collectionId, items, name
    this.props.refresh(this.props.user._id);
    this.forceUpdate();
  };

  getItemList = collectionID => {
    return this.props.user.collections.filter(oneCol => {
      return oneCol._id === collectionID;
    })[0].items;
  };

  formHandleChange = async e => {
    e.preventDefault();
    let { value, name } = e.target;
    if (value[value.length - 1] === " ") {
      value = value.slice(0, -1);
    }
    //value = value.slice(1, value.length)
    this.setState({ [name]: value });
  };

  addToNewColl = e => {
    e.preventDefault();
    createCollectionWithItems(
      this.props.user._id,
      [e.target.attributes.getNamedItem("bookid").value],
      this.state.newCollection
    ); //owner, items, name
    this.setState({ newCollection: "" }, () =>
      this.props.refresh(this.props.user._id)
    );
  };

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Grid item cs={12}>
              <Typography variant="caption">
                Click to add or remove from your collections:
              </Typography>
            </Grid>
            <Grid item cs={12}>
              {this.props.user.collections.map(collection => {
                if (collection.items.includes(this.props.bookId)) {
                  return (
                    <Button
                      size="small"
                      color="primary"
                      key={collection._id}
                      onClick={this.removeFromCollection.bind()}
                      id={collection._id}
                      bookid={this.props.bookId}
                      name={collection.name}
                      variant="contained"
                    >
                      #{collection.name}
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      key={collection._id}
                      onClick={this.addToCollection.bind()}
                      id={collection._id}
                      bookid={this.props.bookId}
                      name={collection.name}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      #{collection.name}
                    </Button>
                  );
                }
              })}
              <form>
                #
                <input
                  type="text"
                  name="newCollection"
                  placeholder="newCollection"
                  onChange={this.formHandleChange}
                  value={"" + this.state.newCollection}
                />
                <button
                  type="submit"
                  bookid={this.props.bookId}
                  onClick={this.addToNewColl}
                >
                  Create + add
                </button>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withAuth(CollectionCloud);
