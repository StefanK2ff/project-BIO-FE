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
        loading: false
    }

    componentDidMount() {
        let defaultCollection = this.getdefaultList()
        this.setState({defaultCollection: defaultCollection}, () => this.setState({loading: false}))
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

  addToLib = e => {
    e.persist();
    let defaultCollection = this.state.defaultCollection;
    let newItemList = [];
    newItemList.push(e.target.id, ...defaultCollection.items);
    modifyCollection(
      defaultCollection._id,
      newItemList,
      defaultCollection.name
    ); //collectionId, items, name
    this.props.refresh(this.props.user._id);
  };

  removeFromLib = e => {
    e.persist();
    let defaultCollection = this.state.defaultCollection;
    let newItemList = defaultCollection.items;
    const i = newItemList.indexOf(e.target.id);
    if (i > -1) newItemList.splice(i, 1);
    modifyCollection(
      defaultCollection._id,
      newItemList,
      defaultCollection.name
    ); //collectionId, items, name
    this.props.refresh(this.props.user._id);
  };
  render() {
    return (
      <div>
        {this.onDefaulftList() ? (
          <input
            onClick={this.removeFromLib}
            type="button"
            value={"Remove from default Collection " + this.state.defaultCollection.name}
            id={this.props.bookId}
          />
        ) : (
          <input
            onClick={this.addToLib}
            type="button"
            value={"Add to default Collection " + this.state.defaultCollection.name}
            id={this.props.bookId}
          />
        )}
      </div>
    );
  }
}

export default withAuth(DefaultCollectionButton);
