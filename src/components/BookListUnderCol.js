import React, { Component } from "react";
import BookLineUnderCol from "./BookLineUnderCol";
import shortid from "shortid";

export default class BookListUnderCol extends Component {
  state = {
    itemsToRemove: [],
    booklist: false
  };
  doMarkForRemove = id => {
    
    let updatedItemsToRemove = [];
    updatedItemsToRemove.push(id, ...this.state.itemsToRemove)
    this.setState({itemsToRemove: updatedItemsToRemove });
    console.log("updatedItemsToRemove ", updatedItemsToRemove)
    //console.log(this.state.itemsToRemove)
  };
  undoMarkForRemove = id => {
    console.log("hello from undoMarkForRemove", id)
    let updatedItemsToRemove = this.state.itemsToRemove;
    const i = updatedItemsToRemove.indexOf(id);
    if (i > -1) updatedItemsToRemove.splice(i, 1);
    this.setState({ itemsToRemove: updatedItemsToRemove });
    console.log(this.state.itemsToRemove)
  };

  toggleBookList = e => {
    e.preventDefault();
    this.setState({ booklist: !this.state.booklist });
  };

  saveAndClose = e => {
      //
  }

  render() {
    return (

      <div key={shortid.generate()}>
        {!this.state.booklist ? (
            <ul>
                <li><button onClick={this.toggleBookList}>Show books</button></li>
            </ul>
          
        ) : (
            <ul>
            <li><button onClick={this.toggleBookList}>Hide books</button></li>
          
            {this.props.items.map(book => {
              return (
                
                  <BookLineUnderCol bookid={book} doMarkForRemove={this.doMarkForRemove} undoMarkForRemove={this.undoMarkForRemove}/>
                
              );
            })}
          
          </ul>
        )}
      </div>
    );
  }
}
