import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addBookToCollection } from "./../lib/collections-services";
import BookListUnderCol from "./BookListUnderCol";
import { withAuth } from "./../lib/Auth";

class CollectionCard extends Component {
  state = {
    newName: "",
    editmode: false,
    booklist: false
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
    if (this.state.newName !== this.props.collection.name) {
        try {
            await addBookToCollection(this.props.collection._id, this.props.collection.items, this.state.newName)
        } catch (error) {
            console.log("error while saving", error)
        }
    }
    this.props.refresh(this.props.user._id);
    this.setState({ editmode: false, newName:"" })
  }

  toggleBookList = e => {
    e.preventDefault();
    this.setState({booklist:!this.state.booklist})
  }

  render() {
    const { name, items } = this.props.collection;
    return (
      <div>
        <li className="inlineEdit">
        {this.state.editmode ? (
            <div>
            <form className="inlineEdit">
              <button onClick={this.saveName}> { (this.state.newName !== this.props.collection.name)? "Save name" : "Keep name" } </button>{" "}
              <input
                type="text"
                name="newName"
                value={this.state.newName}
                onChange={this.formHandleChange}
              />
            </form>
            <span>, with {items.length} item(s){" "}"</span> 
            </div>
        ) : (
            <div>
            <button onClick={this.nameEditField}>Edit name</button> {name}, with{" "}
            {items.length} item(s){" "}
            </div>
        )}

        <button onClick={this.toggleBookList}>Show books</button>
            {this.state.booklist ? <BookListUnderCol items={items} /> : null}
        </li>
      </div>
    );
  }
}

export default withAuth(CollectionCard)
