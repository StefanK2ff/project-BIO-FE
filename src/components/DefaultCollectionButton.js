import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import { modifyCollection } from "./../lib/collections-services";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

/* 
    This Component needs
    - List of the useres Collections (from propos. user)
    - book id "props.bookId"
    - "modifyCollection" Helper Function
    This Components does
    - find out what the current default collection is
    - determine, if book is in this list or not
    - allow to add/remoef it from default list
 
*/

class DefaultCollectionButton extends Component {
  state = {
    defaultCollection: null,
    loading: true
  };

  componentDidMount() {
    let defaultCollection = this.getdefaultList();
    this.setState({ defaultCollection: defaultCollection }, () =>
      this.setState({ loading: false })
    );
  }

  getdefaultList = () => {
    const result = this.props.user.collections.filter(oneCol => {
      return oneCol.default === true;
    })[0];
    return result; // Important: Just one default collection
  };

  onDefaulftList = () => {
    let defaultItems = this.state.defaultCollection.items;
    return defaultItems.includes(this.props.bookId);
  };

  addToCollection = e => {
    let itemList = this.getItemList(this.state.defaultCollection._id);
    let newItemList = [];
    newItemList.push(this.props.bookId, ...itemList);
    modifyCollection(
      this.state.defaultCollection._id,
      newItemList,
      this.state.defaultCollection.name
    ); // collectionId, items, name
    this.props.refresh(this.props.user._id);
    this.forceUpdate();
  };

  removeFromCollection = e => {
    let itemList = this.getItemList(this.state.defaultCollection._id);
    const i = itemList.indexOf(this.props.bookId);
    if (i > -1) itemList.splice(i, 1);
    modifyCollection(
      this.state.defaultCollection._id,
      itemList,
      this.state.defaultCollection.name
    ); // collectionId, items, name
    this.props.refresh(this.props.user._id);
    this.forceUpdate();
  };

  getItemList = collectionID => {
    return this.props.user.collections.filter(oneCol => {
      return oneCol._id === collectionID;
    })[0].items;
  };

  render() {
    const { _id, name, items } = this.getdefaultList();
    return (
      <>
      
        {items.includes(this.props.bookId) ? (
          <Button
            size="small"
            color="primary"
            key={_id}
            onClick={this.removeFromCollection.bind(_id)}
            id={_id}
            bookid={this.props.bookId}
            name={name}
            variant="contained"
          >
            #{name}
          </Button>
        ) : (
          <Button
            key={_id}
            onClick={this.addToCollection.bind(_id)}
            id={_id}
            bookid={this.props.bookId}
            name={name}
            variant="outlined"
            size="small"
            color="primary"
          >
            #{name}
          </Button>
        )}
      </>
    );
  }
}

export default withAuth(DefaultCollectionButton);
