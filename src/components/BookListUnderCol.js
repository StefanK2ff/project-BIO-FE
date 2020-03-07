import React, { Component } from "react";
import BookLineUnderCol from "./BookLineUnderCol";

export default class BookListUnderCol extends Component {
  state = {
    itemsToRemove: []
  };
  collectRemoval = (id) => {
    let updatedItemsToRemove = []
    updatedItemsToRemove = [...this.state.itemsToRemove].push(id)
    this.setState({itemsToRemove: updatedItemsToRemove})
  };
  removeRemoval = (id) => {
    let updatedItemsToRemove = []
    updatedItemsToRemove = [...this.state.itemsToRemove].push(id)
    this.setState({itemsToRemove: updatedItemsToRemove})
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.items.map(book => {
            return (
              <li>
                <BookLineUnderCol bookid={book} />{" "}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
