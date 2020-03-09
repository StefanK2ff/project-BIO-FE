import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import { modifyCollection } from "./../lib/collections-services";

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
    return this.props.user.collections.filter(oneCol => {
      return oneCol.default === true;
    })[0]; // Important: Just one default collection
  };

  onDefaulftList = () => {
    let defaultItems = this.state.defaultCollection.items;
    return defaultItems.includes(this.props.bookId);
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


  render() {
    const {_id, name, items} = this.getdefaultList()
    return (
      <div>
        { items.includes(this.props.bookId) 
            ?  (
              <button
                key={_id}
                onClick={this.removeFromCollection}
                id={_id}
                bookid={this.props.bookId}
                name={name}
                variant="dark"
              >
                Remove from #{name}
              </button>
            )
          
           :  (
              <button
                key={_id}
                onClick={this.addToCollection}
                id={_id}
                bookid={this.props.bookId}
                name={name}
                variant="light"
              >
                Add to #{name}
              </button>
            )
          }
        
        
      </div>
    );
  }
}

export default withAuth(DefaultCollectionButton);
