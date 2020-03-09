import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import {
  createCollectionWithItems,
  addBookToCollection
} from "./../lib/collections-services";

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
    addBookToCollection(e.target.id, newItemList, e.target.name); // collectionId, items, name
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
    addBookToCollection(e.target.id, itemList, e.target.name); // collectionId, items, name
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
    this.setState({ [name]: value });
  };

  addToNewColl = e => {
    e.preventDefault();
    createCollectionWithItems(
      this.props.user._id,
      [e.target.attributes.getNamedItem("bookid").value],
      this.state.newCollection
    ); //owner, items, name
    this.setState({newCollection: ""}, () => this.props.refresh(this.props.user._id));
  };

  render() {
    return (
      <div>
        {this.props.user.collections.map(collection => {
          if (collection.items.includes(this.props.bookId)) {
            return (
              <button
                key={collection._id}
                onClick={this.removeFromCollection}
                id={collection._id}
                bookid={this.props.bookId}
                name={collection.name}
                variant="dark"
              >
                Remove from {collection.name}
              </button>
            );
          } else {
            return (
              <button
                key={collection._id}
                onClick={this.addToCollection}
                id={collection._id}
                bookid={this.props.bookId}
                name={collection.name}
                variant="light"
              >
                Add to {collection.name}
              </button>
            );
          }
        })}
        <form>
          <input
            type="text"
            name="newCollection"
            placeholder="#newCollection"
            onChange={this.formHandleChange}
          />
          <button
            type="submit"
            bookid={this.props.bookId}
            onClick={this.addToNewColl}
          >
            Create + add
          </button>
        </form>
      </div>
    );
  }
}

export default withAuth(CollectionCloud);
