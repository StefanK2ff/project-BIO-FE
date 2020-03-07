import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addBookToCollection } from "./../lib/collections-services";
import { withAuth } from "./../lib/Auth";

class CollectionCard extends Component {
  state = {
    newName: "",
    editmode: false
  };
  nameEditField = e => {
    e.preventDefault();
    this.setState({ editmode: true, newName:this.props.collection.name }); // anti pattern - ok?
  };

  formHandleChange = e => {
    e.preventDefault();
    let { value, name } = e.target;
    this.setState({ [name]: value });
  };

  saveName = async e => {
    e.preventDefault();
    try {
        await addBookToCollection(this.props.collection._id, this.props.collection.items, this.state.newName)
    } catch (error) {
        console.log("error while saving", error)
    }
    
    this.props.refresh(this.props.user._id);
    this.setState({ editmode: false, newName:"" })
  }

  render() {
    const { name, items } = this.props.collection;
    return (
      <div>
        {this.state.editmode ? (
          <li>
            <form className="inlineEdit">
              <button onClick={this.saveName}>Save name</button>{" "}
              <input
                type="text"
                name="newName"
                value={this.state.newName}
                onChange={this.formHandleChange}
              />
            </form>
            , with {items.length} item(s){" "}
          </li>
        ) : (
          <li>
            <button onClick={this.nameEditField}>Edit name</button> {name}, with{" "}
            {items.length} item(s){" "}
          </li>
        )}
      </div>
    );
  }
}

export default withAuth(CollectionCard)
