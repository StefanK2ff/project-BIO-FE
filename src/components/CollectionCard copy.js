import React, { Component } from "react";
import { modifyCollection } from "./../lib/collections-services";
import BookListUnderCol from "./BookListUnderCol";
import { withAuth } from "./../lib/Auth";

class CollectionCard extends Component {
  state = {
    newName: "",
    editmode: false
  };
  nameEditField = e => {
    e.preventDefault();
    this.setState({ editmode: true, newName: this.props.collection.name }); // anti pattern - ok?
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
        await modifyCollection(
          this.props.collection._id,
          this.props.collection.items,
          this.state.newName
        );
      } catch (error) {
        console.log("error while saving", error);
      }
    }
    this.props.refresh(this.props.user._id);
    this.setState({ editmode: false, newName: "" });
  };

  render() {
    const { name, items, _id} = this.props.collection;
    return (
      <li className="inlineEdit" key={this.props.collection._id}>
        {this.state.editmode ? (
          <div>
            <form className="inlineEdit">
              <button onClick={this.saveName}>
                {" "}
                {this.state.newName !== this.props.collection.name
                  ? "Save name"
                  : "Keep name"}{" "}
              </button>{" "}
              <input
                type="text"
                name="newName"
                value={this.state.newName}
                onChange={this.formHandleChange}
              />
            </form>
            <span>, with {items.length} item(s) "</span>
          </div>
        ) : (
          <div>
            <button >Edit name</button> {name}, with{" "}
            {items.length} item(s){" "}
          </div>
        )}
        
          <BookListUnderCol key={_id} collid={_id} collName={name} items={items} />
        
      </li>
    );
  }
}

export default withAuth(CollectionCard);
