import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addBookToCollection } from "./../lib/collections-services";
import { withAuth } from "./../lib/Auth";

class BookCard extends Component {
  getdefaultList = () => {
    return this.props.user.collections.filter(oneCol => {
      return oneCol.default === true;
    })[0];
  };

  onDefaulftList = () => {
    let defaultCollection = this.getdefaultList();
    let defaultItems = defaultCollection.items;
    return defaultItems.includes(this.props.book.id);
  };

  componentDidMount() {
    //
  }

  addToLib = e => {
    e.persist();
    let defaultCollection = this.getdefaultList();
    let newItemList = [];
    newItemList.push(e.target.id, ...defaultCollection.items);
    addBookToCollection(
      defaultCollection._id,
      newItemList,
      defaultCollection.name
    ); //collectionId, items, name
    this.props.refresh(this.props.user._id);
  };

  removeFromLib = e => {
    e.persist();
    let defaultCollection = this.getdefaultList();
    let newItemList = defaultCollection.items;
    const i = newItemList.indexOf(e.target.id);
    if (i > -1) newItemList.splice(i, 1);
    addBookToCollection(
      defaultCollection._id,
      newItemList,
      defaultCollection.name
    ); //collectionId, items, name
    this.props.refresh(this.props.user._id);
  };

  render() {
    return (
      <div key={this.props.book.id}>
        <img
          src={this.props.book.volumeInfo.imageLinks.smallThumbnail}
          alt={this.props.book.volumeInfo.title}
        />
        <li>{this.props.book.volumeInfo.title}</li>
        {/* <li>{this.props.book.volumeInfo.subtitle}</li> */}
        {this.props.book.volumeInfo.authors ? (
          <li>{this.props.book.volumeInfo.authors.map(author => author)}</li>
        ) : null}

        <li>{this.props.book.volumeInfo.publisher}</li>

        {this.onDefaulftList() ? (
          <input
            onClick={this.removeFromLib}
            type="button"
            value="remove from library"
            id={this.props.book.id}
          />
        ) : (
          <input
            onClick={this.addToLib}
            type="button"
            value="Add to library"
            id={this.props.book.id}
          />
        )}
        <Link to={`/book/${this.props.book.id}`}>See book in detail >></Link>
      </div>
    );
  }
}

export default withAuth(BookCard);
