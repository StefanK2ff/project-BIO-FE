import React, { Component } from "react";
import BookCard from "./BookCard";
import { withAuth } from "./../lib/Auth";
import {
  createCollectionWithItems,
  addBookToCollection
} from "./../lib/collections-services";
import CollectionCloud from "./CollectionCloud";

class BookLibraryListing extends Component {
  addToCollection = e => {
    e.preventDefault();
    let itemList = this.getItemList(e.target.id);
    let newItemList = [];
    newItemList.push(e.target.attributes.getNamedItem('bookid').value, ...itemList);
    addBookToCollection(e.target.id, newItemList, e.target.name); // collectionId, items, name
    this.props.refresh(this.props.user._id);
    this.forceUpdate()
  };

  removeFromCollection = e => {
    e.preventDefault();
    let itemList = this.getItemList(e.target.id);
    const i = itemList.indexOf(e.target.attributes.getNamedItem('bookid').value);
    if (i > -1) itemList.splice(i, 1);
    addBookToCollection(e.target.id, itemList, e.target.name); // collectionId, items, name
    this.props.refresh(this.props.user._id);
    this.forceUpdate()
  };

  getItemList = (collectionID) => {
    return this.props.user.collections.filter(oneCol => {return oneCol._id === collectionID})[0].items
  }

  render() {
    console.log("this props from library", this.props.loadedBooks);
    return (
      <div>
        <p>listing</p>

        {this.props.loadedBooks.map(book => {
          return (
            <div>
              <BookCard book={book} />
              <CollectionCloud bookId={book.id} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default withAuth(BookLibraryListing);


